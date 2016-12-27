import java.io.File;
import java.io.FileOutputStream;

import javax.xml.bind.JAXBException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.docx4j.fonts.fop.fonts.Typeface;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.parts.PartName;
import org.docx4j.openpackaging.parts.PresentationML.MainPresentationPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;
import org.docx4j.openpackaging.parts.WordprocessingML.BinaryPartAbstractImage;
import org.docx4j.relationships.Relationship;
import org.pptx4j.jaxb.Context;
import org.pptx4j.pml.Pic;



/**
 * @author jharrop
 *
 */
public class InsertPicture  {
	
	protected static Logger log = LoggerFactory.getLogger(InsertPicture.class);
		
	public static void main(String[] args) throws Exception {

		String outputfilepath = "D://pptx-hello.pptx";
		// Create skeletal package, including a MainPresentationPart and a SlideLayoutPart
		PresentationMLPackage presentationMLPackage = PresentationMLPackage.createPackage(); 
		
		// Need references to these parts to create a slide
		// Please note that these parts *already exist* - they are
		// created by createPackage() above.  See that method
		// for instruction on how to create and add a part.
		MainPresentationPart pp = (MainPresentationPart)presentationMLPackage.getParts().getParts().get(
				new PartName("/ppt/presentation.xml"));		
		SlideLayoutPart layoutPart = (SlideLayoutPart)presentationMLPackage.getParts().getParts().get(
				new PartName("/ppt/slideLayouts/slideLayout1.xml"));
		
		// OK, now we can create a slide
		SlidePart slidePart = presentationMLPackage.createSlidePart(pp, layoutPart, 
				new PartName("/ppt/slides/slide1.xml"));
		
		// Add image part
		File file = new File(System.getProperty("user.dir") + "/src/test/resources/images/1.png" );
		
        BinaryPartAbstractImage imagePart 
        	= BinaryPartAbstractImage.createImagePart(presentationMLPackage, slidePart, file);
		
		        
        // Add p:pic to slide
        slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(createPicture(imagePart.getSourceRelationship().getId()));
//		slidePart.getJaxbElement().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(createPicture(imagePart.getSourceRelationship().getId()));
		

		// Do it again on another slide
		
		SlidePart slidePart2 = presentationMLPackage.createSlidePart(pp, layoutPart, 
				new PartName("/ppt/slides/slide2.xml"));
		Relationship rel = slidePart2.addTargetPart(imagePart);
		
		slidePart2.getJaxbElement().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(
				createPicture(rel.getId()));
		
		
		FileOutputStream out = new FileOutputStream("D://pptx-hello-pic.pptx");
		// All done: save it
		presentationMLPackage.save(out);//.save(new java.io.File(outputfilepath));
		out.close();
		System.out.println("\n\n done .. saved " + outputfilepath);
		
	}	
	
	private static Object createPicture(String relId) throws JAXBException {
		
		// Create p:pic  		
        java.util.HashMap<String, String>mappings = new java.util.HashMap<String, String>();
        
        mappings.put("id1", "4");
        mappings.put("name", "Picture 3");
        mappings.put("descr", "greentick.png");
        mappings.put("rEmbedId", relId );
        mappings.put("offx", Long.toString(4214812));
        mappings.put("offy", Long.toString(3071812));
        mappings.put("extcx", Long.toString(714375));
        mappings.put("extcy", Long.toString(714375));
        
        return org.docx4j.XmlUtils.unmarshallFromTemplate(SAMPLE_PICTURE, 
        		mappings, Context.jcPML, Pic.class ) ;   
        
		
	}
	
	
	private static String SAMPLE_PICTURE = 			
	      "<p:pic xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:p=\"http://schemas.openxmlformats.org/presentationml/2006/main\"> "
	        + "<p:nvPicPr>"
	          + "<p:cNvPr id=\"${id1}\" name=\"${name}\" descr=\"${descr}\"/>"
	          + "<p:cNvPicPr>"
	            + "<a:picLocks noChangeAspect=\"1\"/>"
	          + "</p:cNvPicPr>"
	          + "<p:nvPr/>"
	        + "</p:nvPicPr>"
	        + "<p:blipFill>"
	          + "<a:blip r:embed=\"${rEmbedId}\" cstate=\"print\"/>"
	          + "<a:stretch>"
	            + "<a:fillRect/>"
	          + "</a:stretch>"
	        + "</p:blipFill>"
	        + "<p:spPr>"
	          + "<a:xfrm>"
	            + "<a:off x=\"${offx}\" y=\"${offy}\"/>"
	            + "<a:ext cx=\"${extcx}\" cy=\"${extcy}\"/>"
	          + "</a:xfrm>"
	          + "<a:prstGeom prst=\"rect\">"
	            + "<a:avLst/>"
	          + "</a:prstGeom>"
	        + "</p:spPr>"
	      + "</p:pic>";

	
}