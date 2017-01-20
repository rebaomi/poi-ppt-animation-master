import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.JAXBException;

import org.apache.poi.util.IOUtils;
import org.docx4j.Docx4J;
import org.docx4j.XmlUtils;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.parts.PartName;
import org.docx4j.openpackaging.parts.PresentationML.MainPresentationPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideMasterPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;
import org.docx4j.openpackaging.parts.WordprocessingML.BinaryPartAbstractImage;
import org.pptx4j.Pptx4jException;
import org.pptx4j.jaxb.Context;
import org.pptx4j.pml.Pic;
import org.pptx4j.pml.Shape;

public class Pptx extends APptx{

	private PresentationMLPackage presentationMLPackage;
	
	private MainPresentationPart pp;
	
	private SlideMasterPart slideMaster;
	
	private int slideNum = 0;
	
	private SlideLayoutPart layoutPart;
	
	public Pptx()  {
		initPptx();
	}
	public static void main(String[] args) {
		TextElement e = new TextElement();
		e.setContent("你好");
		e.setFontSize("1850");
		e.setFontFamily("华文彩云");
		e.setOffx(0);
		e.setOffy(0);
		e.setExtcx(800000);
		e.setExtcy(400000);
		
		ImgElement img = new ImgElement();
		img.setDescr("desc");
		img.setId1(1);
		img.setName("test.png");
		img.setOffx(Long.toString(4214812));
		img.setOffy(Long.toString(3071812));
		img.setExtcx(Long.toString(3600000));
		img.setExtcy(Long.toString(3600000));
		
		Pptx p = new Pptx();
		p.initPptx();
		for(int i = 0;i<3;i++){
			SlidePart cur = p.createSlide(i+1);
			p.addText(cur, e);
			p.addImage(cur, img);
		}
		
		try {
			p.output(new FileOutputStream("d:\\testcreate.pptx"));
		} catch (Docx4JException e1) {
			e1.printStackTrace();
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
	}
	@Override
	public void initPptx() {
		try {
			presentationMLPackage = PresentationMLPackage.createPackage();
			pp = (MainPresentationPart)presentationMLPackage.getParts().getParts().get(
					new PartName("/ppt/presentation.xml"));	
			slideMaster = (SlideMasterPart)presentationMLPackage.getParts().getParts().get(
	                new PartName("/ppt/slideMasters/slideMaster1.xml"));
			layoutPart = (SlideLayoutPart)presentationMLPackage.getParts().getParts().get(
					new PartName("/ppt/slideLayouts/slideLayout1.xml"));
		} catch (InvalidFormatException e) {
			e.printStackTrace();
		}
	}

	@Override
	public SlideLayoutPart createSlideLayout(int layoutNumber) {
		SlideLayoutPart layoutPart = null;
        try {
            layoutPart = new SlideLayoutPart(new PartName("/ppt/slideLayouts/slideLayout"+layoutNumber+".xml"));
            // read in slide layout, unmarshal, and set
//            layoutPart.setJaxbElement((SldLayout) XmlUtils.unmarshalString(getLayoutXML(slideName), Context.jcPML));

            // add reference in slideMaster to layout and vice versa
//            slideMaster.addSlideLayoutIdListEntry(layoutPart);
//            layoutPart.addTargetPart(slideMaster);
        } catch (InvalidFormatException e) {
//            System.err.println("Error: PC> SlideLayoutPart creation failed");
            e.printStackTrace();
        } catch (Exception e){
        	e.printStackTrace();
//            System.err.println("Error: PC> slideLayout did not pass validation");
        }
        return layoutPart;
	}

	@Override
	public SlidePart createSlide(SlideLayoutPart layoutPart, int sNum){
		SlidePart slidePart = null;
		try {
			slidePart = new SlidePart(new PartName("/ppt/slides/slide"+sNum+".xml"));
			slidePart.setContents( SlidePart.createSld() );		
			
			pp.addSlide(0, slidePart);
			
			slidePart.addTargetPart(layoutPart);
			
			slideNum++;
		} catch (InvalidFormatException e) {
			e.printStackTrace();
		} catch (JAXBException e) {
			e.printStackTrace();
		} catch (Pptx4jException e) {

			e.printStackTrace();
		}
		return slidePart;
	}
	
	@Override
	public SlidePart createSlide(int slideNum) {
//		SlideLayoutPart layoutPart = createSlideLayout(1);
		return createSlide(layoutPart, slideNum);
	}

	private void addShape(SlidePart slidePart, Object shape) throws Docx4JException{
		slidePart.getContents().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(shape);
	}
	
	@Override
	public Shape addText(SlidePart slidePart, TextElement e) {
		Shape text = null;
		try {
			String xml = getTextArea(e.getContent(),e.getFontFamily(),e.getFontSize(),e.getOffxString(), e.getOffyString(),
					e.getExtcxString(), e.getExtcyString());
			
			text = ((Shape)XmlUtils.unmarshalString(xml, Context.jcPML));
			addShape(slidePart, text);
		} catch (JAXBException e1) {
			e1.printStackTrace();
		} catch (Docx4JException e1) {
			e1.printStackTrace();
		} 
		return text;
	}

	@Override
	public Shape addImage(SlidePart slidePart, ImgElement e) {
		File file = new File(System.getProperty("user.dir") + "/src/test/resources/images/1.png" );
		BinaryPartAbstractImage imagePart;
		Object img = null;
		try {
			byte[] bytes = IOUtils.toByteArray(new FileInputStream(file));
			imagePart = BinaryPartAbstractImage.createImagePart(presentationMLPackage, slidePart, bytes);
			
	        Map<String, String> mappings = new HashMap<String, String>();
	        
	        mappings.put("id1", e.getId1());
	        mappings.put("name", e.getName());
	        mappings.put("descr", e.getDescr());
	        String relId = imagePart.getSourceRelationships().get(0).getId();//.getSourceRelationship().getId();
	        mappings.put("rEmbedId", relId );
	        mappings.put("offx", e.getOffx());
	        mappings.put("offy", e.getOffy());
	        mappings.put("extcx", e.getExtcx());
	        mappings.put("extcy", e.getExtcy());
	        
	        img =  XmlUtils.unmarshallFromTemplate(SAMPLE_PICTURE, 
	        		mappings, Context.jcPML, Pic.class ) ;
	        addShape(slidePart, img);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public void output(OutputStream out) throws Docx4JException{
		presentationMLPackage.save(out);
		
	}

	public PresentationMLPackage getPresentationMLPackage() {
		return presentationMLPackage;
	}

	public MainPresentationPart getPp() {
		return pp;
	}

	public SlideMasterPart getSlideMaster() {
		return slideMaster;
	}

	public int getSlideNum() {
		return slideNum;
	}

	
}
