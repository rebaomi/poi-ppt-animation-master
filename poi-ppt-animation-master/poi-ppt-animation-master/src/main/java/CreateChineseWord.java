import java.util.Random;

import javax.xml.bind.JAXBException;

import org.docx4j.XmlUtils;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.parts.PartName;
import org.docx4j.openpackaging.parts.PresentationML.MainPresentationPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;
import org.pptx4j.jaxb.Context;
import org.pptx4j.pml.Shape;

public class CreateChineseWord {
	private final int tTextAyX = 539552;
	 private final int tTextAyY = 1556792;
	 private final int tTextAyCX = 8064896;
	 private final int tTextAyCY = 396332;
	 public static void main(String[] args) throws Docx4JException {
		 String outputfilepath = "D://pptx-hello-c.pptx";
		 PresentationMLPackage presentationMLPackage = PresentationMLPackage.createPackage(); 
		 MainPresentationPart pp = (MainPresentationPart)presentationMLPackage.getParts().getParts().get(
					new PartName("/ppt/presentation.xml"));		
			SlideLayoutPart layoutPart = (SlideLayoutPart)presentationMLPackage.getParts().getParts().get(
					new PartName("/ppt/slideLayouts/slideLayout1.xml"));
		 CreateChineseWord a = new CreateChineseWord();
		 a.createStChartSlide(presentationMLPackage, "表");
		 
		 presentationMLPackage.save(new java.io.File(outputfilepath));

		 System.out.println("\n\n done .. saved " + outputfilepath);
		 
	}
	private void createStChartSlide(PresentationMLPackage presentationMLPackage, String title)
			throws Docx4JException {
	  String partTitle = title;
	  String partName = "/ppt/slides/" + 1+ ".xml";
	  SlidePart slidePart = createCommonSlide(presentationMLPackage, partTitle, partName);
//	  slidePart.setContents( SlidePart.createSld() );		
//		pp.addSlide(0, slidePart);
	  Shape descShape;
	  try {
	   descShape = (Shape) XmlUtils.unmarshalString(getTextArea("插入一个文本框",tTextAyX, tTextAyY,
	       tTextAyCX, tTextAyCY), Context.jcPML);
	   
	   slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(descShape);
//	   ((Sld) slidePart.getJaxbElement()).getCSld().getSpTree()
//	     .getSpOrGrpSpOrGraphicFrame().add(descShape);
	  } catch (JAXBException e1) {
	   e1.printStackTrace();
	  }
	 }
//	 private String getRandomID(){
//	  return Math.abs(ran.nextInt()) +"";
//	 }
	/**
	  * 创建一页
	  * 
	  * @param presentationMLPackage
	  * @param title
	  * @param partName
	  * @return
	 * @throws Docx4JException 
	  */
	 private SlidePart createCommonSlide(
	   PresentationMLPackage presentationMLPackage, String title,
	   String partName) throws Docx4JException {
	  MainPresentationPart mainPart = presentationMLPackage
	    .getMainPresentationPart();
	  SlideLayoutPart layoutPart;
	  try {
	   layoutPart = (SlideLayoutPart) presentationMLPackage.getParts()
	     .getParts()
	     .get(new PartName("/ppt/slideLayouts/slideLayout2.xml"));
	   SlidePart slidePart = PresentationMLPackage.createSlidePart(
	     mainPart, layoutPart, new PartName(partName));
	   Shape titleShape = (Shape) XmlUtils.unmarshalString(
	     getSlideTitle(title), Context.jcPML);
	   slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(titleShape);
//	   ((Sld) slidePart.getJaxbElement()).getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(titleShape);
	   return slidePart;
	  } catch (InvalidFormatException e) {
	   e.printStackTrace();
	  } catch (JAXBException e) {
	   // TODO Auto-generated catch block
	   e.printStackTrace();
	  }
	  return null;
	 }
	 
	 private String getSlideTitle(String title){
		 return "--" + title;
	 }
	 
	/**
	  * @param preset
	  * @param x
	  * @param y
	  * @param cx
	  * @param cy
	  * @return
	  */
	 private String getTextArea(String preset, int x, int y, int cx, int cy) {
	  return "<p:sp  xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" "
	    + "xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" "
	    + "xmlns:p=\"http://schemas.openxmlformats.org/presentationml/2006/main\">"
	    + "<p:nvSpPr><p:cNvPr id=\"5\" name=\"TextBox 4\"/><p:cNvSpPr txBox=\"1\"/><p:nvPr/></p:nvSpPr>"
	    + "<p:spPr><a:xfrm><a:off x=\""
	    + x
	    + "\" y=\""
	    + y
	    + "\"/><a:ext cx=\""
	    + cx
	    + "\" cy=\""
	    + cy
	    + "\"/>"
	    + "</a:xfrm><a:prstGeom prst=\"rect\"><a:avLst/></a:prstGeom><a:noFill/></p:spPr><p:txBody>"
	    + "<a:bodyPr wrap=\"square\" rtlCol=\"0\"><a:spAutoFit/></a:bodyPr><a:lstStyle/><a:p>"
	    + "<a:r><a:rPr lang=\"en-US\" altLang=\"zh-CN\" dirty=\"0\" err=\"1\" smtClean=\"0\">"
	    + "<a:latin typeface=\"微软雅黑\" pitchFamily=\"34\" charset=\"-122\"/>"
	    + "<a:ea typeface=\"微软雅黑\" pitchFamily=\"34\" charset=\"-122\"/>"
	    + "</a:rPr><a:t>"
	    + preset
	    + "</a:t></a:r>"
	    + "<a:endParaRPr lang=\"zh-CN\" altLang=\"en-US\" dirty=\"0\">"
	    + "<a:latin typeface=\"微软雅黑\" pitchFamily=\"34\" charset=\"-122\"/>"
	    + "<a:ea typeface=\"微软雅黑\" pitchFamily=\"34\" charset=\"-122\"/></a:endParaRPr>"
	    + "</a:p></p:txBody></p:sp>";
	 }
}
