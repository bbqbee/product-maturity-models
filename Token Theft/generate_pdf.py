"""
PDF Generator for Microsoft ME5 Security Solutions Website
Converts the print-optimized HTML to a professional PDF document
"""

import subprocess
import sys
import os
from pathlib import Path

def install_wkhtmltopdf():
    """Check if wkhtmltopdf is available, provide installation instructions if not"""
    try:
        subprocess.run(['wkhtmltopdf', '--version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("⚠️  wkhtmltopdf not found. Please install it:")
        print("\n📦 Installation Options:")
        print("1. Download from: https://wkhtmltopdf.org/downloads.html")
        print("2. Or use Chocolatey: choco install wkhtmltopdf")
        print("3. Or use Scoop: scoop install wkhtmltopdf")
        return False

def generate_pdf():
    """Generate PDF from the print-optimized HTML"""
    
    # Check if wkhtmltopdf is available
    if not install_wkhtmltopdf():
        print("\n🔄 Alternative: Use browser method (instructions below)")
        return False
    
    # File paths
    html_file = Path("print-version.html").absolute()
    pdf_file = Path("Microsoft_ME5_Security_Solutions_Guide.pdf").absolute()
    
    # Check if HTML file exists
    if not html_file.exists():
        print(f"❌ HTML file not found: {html_file}")
        return False
    
    print(f"🔄 Generating PDF from {html_file}")
    
    # wkhtmltopdf command with optimized settings
    cmd = [
        'wkhtmltopdf',
        '--page-size', 'A4',
        '--margin-top', '15mm',
        '--margin-bottom', '15mm',
        '--margin-left', '15mm',
        '--margin-right', '15mm',
        '--encoding', 'UTF-8',
        '--disable-smart-shrinking',
        '--print-media-type',
        '--enable-local-file-access',
        '--javascript-delay', '1000',
        str(html_file),
        str(pdf_file)
    ]
    
    try:
        # Run the conversion
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ PDF generated successfully: {pdf_file}")
            print(f"📄 File size: {pdf_file.stat().st_size / 1024:.1f} KB")
            return True
        else:
            print(f"❌ Error generating PDF: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Error running wkhtmltopdf: {e}")
        return False

def browser_instructions():
    """Provide instructions for browser-based PDF generation"""
    print("\n📖 Browser-Based PDF Generation:")
    print("1. Open print-version.html in your browser")
    print("2. Press Ctrl+P (or Cmd+P on Mac)")
    print("3. Choose 'Save as PDF' as destination")
    print("4. Configure settings:")
    print("   - Layout: Portrait")
    print("   - Paper size: A4")
    print("   - Margins: Default")
    print("   - More settings → Background graphics: ✅")
    print("5. Click 'Save' and choose filename")

if __name__ == "__main__":
    print("🛡️  Microsoft ME5 Security Solutions - PDF Generator")
    print("=" * 60)
    
    # Try automated PDF generation
    success = generate_pdf()
    
    if not success:
        browser_instructions()
    
    print("\n📋 Additional Options:")
    print("• Original website: Open index.html in browser")
    print("• Print-optimized: Open print-version.html in browser")
    print("• Use Ctrl+P in any browser to create PDF")