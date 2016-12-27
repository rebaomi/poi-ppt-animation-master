import java.net.URI;

import org.docx4j.XmlUtils;
import org.docx4j.dml.CTNonVisualDrawingProps;
import org.docx4j.dml.CTPoint2D;
import org.docx4j.dml.CTPositiveSize2D;
import org.docx4j.dml.CTPresetGeometry2D;
import org.docx4j.dml.CTRegularTextRun;
import org.docx4j.dml.CTShapeProperties;
import org.docx4j.dml.CTTextBody;
import org.docx4j.dml.CTTextBodyProperties;
import org.docx4j.dml.CTTextCharacterProperties;
import org.docx4j.dml.CTTextParagraph;
import org.docx4j.dml.CTTransform2D;
import org.docx4j.dml.ObjectFactory;
import org.docx4j.dml.STShapeType;
import org.docx4j.dml.STTextWrappingType;
import org.docx4j.dml.TextFont;
import org.docx4j.openpackaging.contenttype.ContentTypeManager;
import org.docx4j.openpackaging.contenttype.ContentTypes;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.parts.PartName;
import org.docx4j.openpackaging.parts.PresentationML.MainPresentationPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;
import org.pptx4j.jaxb.Context;
import org.pptx4j.pml.Shape;
import org.pptx4j.pml.Shape.NvSpPr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 * @author jharrop
 *
 */
public class CreateHelloWorld  {
	
	
	protected static Logger log = LoggerFactory.getLogger(CreateHelloWorld.class);
	
//	private static boolean MACRO_ENABLE = true;
		
	public static void main(String[] args) throws Exception {
		final int tTextAyX = 539552;
		 final int tTextAyY = 1556792;
		 final int tTextAyCX = 8064896;
		 final int tTextAyCY = 396332;
		// Where will we save our new .ppxt?
//		String outputfilepath = System.getProperty("user.dir") + "/sample-docs/pptx-test.pptx";
		String outputfilepath = "D://pptx-hello.pptx";
//		if (MACRO_ENABLE) outputfilepath += "m";
		
		// Create skeletal package, including a MainPresentationPart and a SlideLayoutPart
		PresentationMLPackage presentationMLPackage = PresentationMLPackage.createPackage(); 
		
//		if (MACRO_ENABLE) {
//			ContentTypeManager ctm = presentationMLPackage.getContentTypeManager();
//			ctm.removeContentType(new PartName("/ppt/presentation.xml") );
//			ctm.addOverrideContentType(new URI("/ppt/presentation.xml"), ContentTypes.PRESENTATIONML_MACROENABLED);
//		}
		 
		// Need references to these parts to create a slide
		// Please note that these parts *already exist* - they are
		// created by createPackage() above.  See that method
		// for instruction on how to create and add a part.
		MainPresentationPart pp = (MainPresentationPart)presentationMLPackage.getParts().getParts().get(
				new PartName("/ppt/presentation.xml"));		
		SlideLayoutPart layoutPart = (SlideLayoutPart)presentationMLPackage.getParts().getParts().get(
				new PartName("/ppt/slideLayouts/slideLayout1.xml"));
		
		
		
		// OK, now we can create a slide
		SlidePart slidePart = new SlidePart(new PartName("/ppt/slides/slide1.xml"));
		slidePart.setContents( SlidePart.createSld() );		
		pp.addSlide(0, slidePart);
		
		// Slide layout part
		slidePart.addTargetPart(layoutPart);
		
				
		// Create and add shape
		Shape sample = ((Shape)XmlUtils.unmarshalString(getTextArea("插入一个文本框","仿宋","1850",tTextAyX, tTextAyY,
			       tTextAyCX, tTextAyCY), Context.jcPML) );
//		Shape sample = ((Shape)XmlUtils.unmarshalString(SAMPLE_SHAPE, Context.jcPML) );
		slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(sample);
		
		Shape sample2 = ((Shape)XmlUtils.unmarshalString(getTextArea("你试试这个字体","黑体","1850", 0, 0,
				800000, 400000), Context.jcPML) );
		slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(sample2);
		Shape code = createShape(slidePart,"大幅将");
		slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(code);
		
		// All done: save it
		presentationMLPackage.save(new java.io.File(outputfilepath));

		System.out.println("\n\n done .. saved " + outputfilepath);
		
	}	
	
	
	private static String getTextArea(String preset,String fontFamily, String fontSize, int x, int y, int cx, int cy) {
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
		    + "<a:r><a:rPr lang=\"en-US\" altLang=\"zh-CN\" dirty=\"0\" err=\"1\" sz=\""+fontSize+"\" smtClean=\"0\">"
		    + "<a:latin typeface=\""+fontFamily+"\" pitchFamily=\"34\" charset=\"-122\"/>"
		    + "<a:ea typeface=\""+fontFamily+"\" pitchFamily=\"34\" charset=\"-122\"/>"
		    + "</a:rPr><a:t>"
		    + preset
		    + "</a:t></a:r>"
		    + "<a:endParaRPr lang=\"zh-CN\" altLang=\"en-US\" sz=\""+fontSize+"\" dirty=\"0\">"
		    + "<a:latin typeface=\""+fontFamily+"\" pitchFamily=\"34\" charset=\"-122\"/>"
		    + "<a:ea typeface=\""+fontFamily+"\" pitchFamily=\"34\" charset=\"-122\"/></a:endParaRPr>"
		    + "</a:p></p:txBody></p:sp>";
		 }
	
	private static Shape createShape(SlidePart slidePart, String value) {
		  org.pptx4j.pml.ObjectFactory graphicObjectFactory = new org.pptx4j.pml.ObjectFactory();
		
		  Shape shape = graphicObjectFactory.createShape();
		
		  ObjectFactory objectFactory = new ObjectFactory();
		  CTNonVisualDrawingProps cnvpr = objectFactory.createCTNonVisualDrawingProps();
		  cnvpr.setId(1);

		  NvSpPr nvSpPr = graphicObjectFactory.createShapeNvSpPr();
		  nvSpPr.setCNvPr(cnvpr);
		  nvSpPr.setCNvSpPr(objectFactory.createCTNonVisualDrawingShapeProps());
		  nvSpPr.setNvPr(graphicObjectFactory.createNvPr());
		  
		  shape.setNvSpPr(nvSpPr);
		  
		  CTShapeProperties ctShapePr = objectFactory.createCTShapeProperties();

		  CTTransform2D ctTransform2D = objectFactory.createCTTransform2D();
		  CTPoint2D ctPoint2D = objectFactory.createCTPoint2D();
		  CTPositiveSize2D ctPositiveSize2D = objectFactory
		    .createCTPositiveSize2D();
		  ctTransform2D.setOff(ctPoint2D);
		  ctTransform2D.setExt(ctPositiveSize2D);

		  ctShapePr.setXfrm(ctTransform2D);
		  
		  CTPresetGeometry2D ctPresetGeometry2D = objectFactory
		    .createCTPresetGeometry2D();
		  ctPresetGeometry2D.setPrst(STShapeType.RECT);
		  ctPresetGeometry2D.setAvLst(objectFactory.createCTGeomGuideList());
		  ctShapePr.setPrstGeom(ctPresetGeometry2D);
		  ctShapePr.setNoFill(objectFactory.createCTNoFillProperties());
		  CTTextBody txBody = objectFactory.createCTTextBody();
		  CTTextBodyProperties bodyPr = objectFactory
		    .createCTTextBodyProperties();
		  bodyPr.setWrap(STTextWrappingType.SQUARE);
		  bodyPr.setRtlCol(false);
		  bodyPr.setSpAutoFit(objectFactory.createCTTextShapeAutofit());
		  txBody.setBodyPr(bodyPr);
		  txBody.setLstStyle(objectFactory.createCTTextListStyle());
		  CTTextParagraph ctTextPr = objectFactory.createCTTextParagraph();
		  CTRegularTextRun run = objectFactory.createCTRegularTextRun();
		  CTTextCharacterProperties ctTpr = objectFactory
		    .createCTTextCharacterProperties();
		  // 14号字体
		  ctTpr.setSz(1400);
		  TextFont font = objectFactory.createTextFont();
		  font.setTypeface("微软雅黑");
		  ctTpr.setLatin(font);
		  ctTpr.setEa(font);
		  
		  run.setRPr(ctTpr);
		  // 设置内容
		  run.setT(value);
		  ctTextPr.getEGTextRun().add(run);
		  ctTextPr.setEndParaRPr(objectFactory.createCTTextCharacterProperties());
		  txBody.getP().add(ctTextPr);
		  shape.setTxBody(txBody);
		  shape.setSpPr(ctShapePr);
		return shape;
		 }
	
	private static String SAMPLE_SHAPE = 			
		"<p:sp   xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:p=\"http://schemas.openxmlformats.org/presentationml/2006/main\">"
		+ "<p:nvSpPr>"
		+ "<p:cNvPr id=\"4\" name=\"Title 3\" />"
		+ "<p:cNvSpPr>"
			+ "<a:spLocks noGrp=\"1\" />"
		+ "</p:cNvSpPr>"
		+ "<p:nvPr>"
			+ "<p:ph type=\"title\" />"
		+ "</p:nvPr>"
	+ "</p:nvSpPr>"
	+ "<p:spPr />"
	+ "<p:txBody>"
		+ "<a:bodyPr />"
		+ "<a:lstStyle />"
		+ "<a:p>"
			+ "<a:r>"
				+ "<a:rPr lang=\"en-US\" smtClean=\"0\" />"
				+ "<a:t>Hello World</a:t>"
			+ "</a:r>"
			+ "<a:endParaRPr lang=\"en-US\" />"
		+ "</a:p>"
	+ "</p:txBody>"
+ "</p:sp>";

	
}