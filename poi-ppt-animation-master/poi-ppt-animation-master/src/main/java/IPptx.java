import java.io.FileNotFoundException;
import java.io.OutputStream;

import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;
import org.pptx4j.pml.Shape;

public interface IPptx {
	
	void initPptx();
	
	SlideLayoutPart createSlideLayout(int layoutNumber);
	
	SlidePart createSlide(SlideLayoutPart layoutPart, int slideNum);
	
	SlidePart createSlide(int slideNum);
	
	Shape addText(SlidePart slidePart, TextElement textElement);
	
	Shape addImage(SlidePart slidePart, ImgElement imgElement);
	
	void output(OutputStream out) throws Docx4JException;
	
}
