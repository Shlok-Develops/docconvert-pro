const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs').promises;

const execPromise = util.promisify(exec);

class ConversionService {
  async convertFiles(files, targetFormat) {
    const results = [];
    
    for (const file of files) {
      try {
        const result = await this.convertFile(file, targetFormat);
        results.push({
          ...file,
          status: 'success',
          convertedName: result.convertedName,
          downloadName: result.downloadName
        });
      } catch (error) {
        results.push({
          ...file,
          status: 'error',
          error: error.message
        });
      }
    }
    
    return results;
  }

  async convertFile(file, targetFormat) {
    const inputPath = path.join('./uploads', file.id);
    const originalNameWithoutExt = path.parse(file.originalName).name;
    const outputName = `${originalNameWithoutExt}.${targetFormat.toLowerCase()}`;
    const outputPath = path.join('./converted', `${file.id}_${outputName}`);

    // Determine conversion method based on file type and target format
    const sourceExt = path.extname(file.originalName).toLowerCase().substring(1);
    
    if (this.isOfficeFormat(sourceExt) || this.isOfficeFormat(targetFormat)) {
      await this.convertWithLibreOffice(inputPath, outputPath, targetFormat);
    } else if (this.isImageFormat(sourceExt) && this.isImageFormat(targetFormat)) {
      await this.convertImage(inputPath, outputPath);
    } else if (sourceExt === 'pdf' && this.isImageFormat(targetFormat)) {
      await this.convertPdfToImage(inputPath, outputPath);
    } else {
      throw new Error(`Conversion from ${sourceExt} to ${targetFormat} not supported`);
    }

    return {
      convertedName: path.basename(outputPath),
      downloadName: outputName
    };
  }

  isOfficeFormat(format) {
    return ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf'].includes(format.toLowerCase());
  }

  isImageFormat(format) {
    return ['jpg', 'jpeg', 'png'].includes(format.toLowerCase());
  }

  async convertWithLibreOffice(inputPath, outputPath, targetFormat) {
    const outputDir = path.dirname(outputPath);
    const tempName = path.basename(inputPath);
    
    try {
      // LibreOffice paths for Windows
      const libreOfficePaths = [
        '"C:\\Program Files\\LibreOffice\\program\\soffice.exe"',
        '"C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe"',
        'soffice'
      ];
      
      let cmd = null;
      for (const loPath of libreOfficePaths) {
        cmd = `${loPath} --headless --convert-to ${targetFormat.toLowerCase()} --outdir "${outputDir}" "${inputPath}"`;
        try {
          await execPromise(cmd);
          break;
        } catch (err) {
          if (loPath === libreOfficePaths[libreOfficePaths.length - 1]) {
            throw err;
          }
        }
      }
      
      // Rename the output file to match our expected name
      const expectedOutput = path.join(outputDir, `${path.parse(tempName).name}.${targetFormat.toLowerCase()}`);
      await fs.rename(expectedOutput, outputPath);
    } catch (error) {
      throw new Error(`LibreOffice conversion failed: ${error.message}`);
    }
  }

  async convertImage(inputPath, outputPath) {
    try {
      // ImageMagick conversion
      const cmd = `magick "${inputPath}" "${outputPath}"`;
      await execPromise(cmd);
    } catch (error) {
      throw new Error(`Image conversion failed: ${error.message}`);
    }
  }

  async convertPdfToImage(inputPath, outputPath) {
    try {
      // Ghostscript for PDF to image
      const cmd = `gs -dNOPAUSE -dBATCH -sDEVICE=jpeg -r300 -sOutputFile="${outputPath}" "${inputPath}"`;
      await execPromise(cmd);
    } catch (error) {
      throw new Error(`PDF to image conversion failed: ${error.message}`);
    }
  }
}

module.exports = new ConversionService();
