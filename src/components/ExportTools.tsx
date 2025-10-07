import { useState } from 'react';
import type { ResumeData } from '../types/resume';
import { Download, FileText, Save } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportToolsProps {
  resumeData: ResumeData;
  resumeRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportTools({ resumeData, resumeRef }: ExportToolsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      
      const x = (pdfWidth - finalWidth) / 2;
      const y = 10;
      
      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`${resumeData.basicdetails.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.basicdetails.name.replace(/\s+/g, '_')}_Resume.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToHTML = () => {
    if (!resumeRef.current) return;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.basicdetails.name} - Resume</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .resume-preview { max-width: 800px; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div class="resume-preview">
          ${resumeRef.current.innerHTML}
        </div>
      </body>
      </html>
    `;
    
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(htmlBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.basicdetails.name.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="btn-primary flex items-center space-x-2"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </>
        )}
      </button>
      
      <button
        onClick={exportToHTML}
        className="btn-secondary flex items-center space-x-2"
      >
        <FileText className="h-4 w-4" />
        <span>HTML</span>
      </button>
      
      <button
        onClick={exportToJSON}
        className="btn-secondary flex items-center space-x-2"
      >
        <Save className="h-4 w-4" />
        <span>JSON</span>
      </button>
    </div>
  );
}