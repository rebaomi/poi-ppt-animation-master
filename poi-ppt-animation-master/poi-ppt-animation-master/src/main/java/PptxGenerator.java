

import org.docx4j.openpackaging.parts.WordprocessingML.BinaryPartAbstractImage;
import org.pptx4j.pml.Pic;
import org.docx4j.XmlUtils;
import org.pptx4j.Pptx4jException;
import org.pptx4j.jaxb.Context;
import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.parts.PartName;
import org.docx4j.openpackaging.parts.PresentationML.MainPresentationPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideMasterPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;
import org.docx4j.dml.*;
import org.pptx4j.pml.Shape;
import org.pptx4j.pml.SldLayout;
import javax.xml.bind.JAXBException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.pptx4j.model.SlideSizesWellKnown;
import org.pptx4j.pml.STPlaceholderType;
import org.pptx4j.pml.CTPlaceholder;
import org.pptx4j.pml.NvPr;
import org.pptx4j.pml.Shape.NvSpPr;
import java.io.*;
import java.nio.channels.FileChannel;
import java.nio.MappedByteBuffer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;



public class PptxGenerator  {
    SlideMasterPart slideMaster;
    PresentationMLPackage presentationMLPackage;
    MainPresentationPart pp;
    int slideNum = 0;

    public PptxGenerator() throws Exception {
        presentationMLPackage = PresentationMLPackage.createPackage(SlideSizesWellKnown.SCREEN16x9, true); 
        pp = (MainPresentationPart)presentationMLPackage.getParts().getParts().get(
                new PartName("/ppt/presentation.xml"));
        slideMaster = (SlideMasterPart)presentationMLPackage.getParts().getParts().get(
                new PartName("/ppt/slideMasters/slideMaster1.xml"));
    }

    public SlidePart createSlide(SlideLayoutPart layoutPart) throws Exception {
        slideNum ++;
        SlidePart slidePart = presentationMLPackage.createSlidePart(pp, layoutPart, 
                new PartName("/ppt/slides/slide" + slideNum + ".xml"));
        return slidePart;
    }

    public SlidePart createSlidePart(SlideLayoutPart layoutPart) throws InvalidFormatException, JAXBException, Pptx4jException{
    	slideNum ++;
    	SlidePart slidePart = new SlidePart(new PartName("/ppt/slides/slide" + slideNum + ".xml"));
    	slidePart.setContents( SlidePart.createSld() );		
    	pp.addSlide(0, slidePart);
    	slidePart.addTargetPart(layoutPart);
    	return slidePart;
    }
    
    public SlidePart createTwoContentSlide() throws Exception {
        SlideLayoutPart layout = createLayout(1, "twocontent");
        return createSlidePart(layout);
    }

    public SlidePart createStandardSlide() throws Exception {
        SlideLayoutPart layout = createLayout(2, "standard");
        return createSlidePart(layout);
    }

    public void addTitle(SlidePart slide, String content){
        // create a new shape and set its id and name
        Shape titleShape = createShape(2, "Title 1", STPlaceholderType.CTR_TITLE, 0);

        // create SpPr
        titleShape.setSpPr(new CTShapeProperties());
        ArrayList<String> s = new ArrayList<String>();
        s.add(content);
        CTTextBody ctTB = createTextBody(s);
        ctTB.getP().get(0).getPPr().setAlgn(STTextAlignType.CTR);
        //ctTP.getPPr().setAlgn(STTextAlignType.CTR);
        // add textbody
        titleShape.setTxBody(ctTB);
        // add shape
        slide.getJaxbElement().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(titleShape);
    }

    public void addContent1(SlidePart slide, ArrayList<String> content){
        // create a new shape and set its id and name
        Shape standardShape = createShape(3, "Content Placeholder 2", STPlaceholderType.BODY, 1);

        // create SpPr
        standardShape.setSpPr(new CTShapeProperties());
        CTTextBody ctTB = createTextBody(content);
        //ctTB.getP().get(0).getPPr().setAlgn(STTextAlignType.CTR);
        ctTB.getP().get(0).getPPr().setLvl(0);
        // add textbody
        standardShape.setTxBody(ctTB);
        // add shape
        slide.getJaxbElement().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(standardShape);
    }

    public void addImage(SlidePart slidePart, String filepath, long offx, long offy, long extcx, long extcy) throws Exception {
        // Add image part
        File file = new File(filepath);
        BinaryPartAbstractImage imagePart 
            = BinaryPartAbstractImage.createImagePart(presentationMLPackage, slidePart, file);

        // Create p:pic         
        java.util.HashMap<String, String>mappings = new java.util.HashMap<String, String>();

        mappings.put("id1", "4");
        mappings.put("name", "Picture");
        mappings.put("descr", "nothing much");
        mappings.put("rEmbedId", imagePart.getSourceRelationship().getId() );
        mappings.put("offx", Long.toString(offx));
        mappings.put("offy", Long.toString(offy));
        mappings.put("extcx", Long.toString(extcx));
        mappings.put("extcy", Long.toString(extcy));

        Object o = org.docx4j.XmlUtils.unmarshallFromTemplate(PICTURE_XML,
                mappings, Context.jcPML, Pic.class ) ;

        // Add p:pic to slide
        slidePart.getJaxbElement().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(o);
    }

    public void addTextShape(SlidePart slide, String text, long offx, long offy, long extcx, long extcy) throws Exception {

        java.util.HashMap<String, String>mappings = new java.util.HashMap<String, String>();
        mappings.put("content_text", text );
        mappings.put("offx", Long.toString(offx));
        mappings.put("offy", Long.toString(offy));
        mappings.put("extcx", Long.toString(extcx));
        mappings.put("extcy", Long.toString(extcy));

        Shape sample = ((Shape)XmlUtils.unmarshallFromTemplate(SHAPE_XML, mappings, Context.jcPML));
        slide.getJaxbElement().getCSld().getSpTree().getSpOrGrpSpOrGraphicFrame().add(sample);
    }

    public void save(String outputfilepath) throws Exception {
        presentationMLPackage.save(new java.io.File(outputfilepath));
    }

    SlideLayoutPart createLayout(int layoutNumber, String slideName){
        SlideLayoutPart layoutPart = null;
        try {
            // create new slide layout
            layoutPart = new SlideLayoutPart(new PartName("/ppt/slideLayouts/slideLayout"+layoutNumber+".xml"));
            // read in slide layout, unmarshal, and set
            layoutPart.setJaxbElement((SldLayout) XmlUtils.unmarshalString(getLayoutXML(slideName), Context.jcPML));

            // add reference in slideMaster to layout and vice versa
            slideMaster.addSlideLayoutIdListEntry(layoutPart);
            layoutPart.addTargetPart(slideMaster);
        } catch (JAXBException e) {
            System.err.println("Error: PC> JAXB slide layout write failed");
        } catch (InvalidFormatException e) {
            System.err.println("Error: PC> SlideLayoutPart creation failed");
        } catch (Exception e){
            System.err.println("Error: PC> slideLayout did not pass validation");
        }
        return layoutPart;
    }

    String getLayoutXML(String layout){
        try {
            return readFile(System.getProperty("user.dir") + "/" + layout + ".xml");
        } catch (Exception e) {
            return "";
        }
    }
    Shape createShape(int id, String name, STPlaceholderType type, int idx){
            Shape scratch = new Shape();
            // create NvSpPr, set attribs
            scratch.setNvSpPr(new NvSpPr());{
                    scratch.getNvSpPr().setCNvPr(new CTNonVisualDrawingProps());
                    scratch.getNvSpPr().getCNvPr().setId(id);
                    scratch.getNvSpPr().getCNvPr().setName(name);
                    scratch.getNvSpPr().setCNvSpPr(new CTNonVisualDrawingShapeProps());
                    scratch.getNvSpPr().getCNvSpPr().setSpLocks(new CTShapeLocking());
                    scratch.getNvSpPr().getCNvSpPr().getSpLocks().setNoGrp(Boolean.TRUE);}
            // create NvPr, set attribs
            scratch.getNvSpPr().setNvPr(new NvPr());{
                    scratch.getNvSpPr().getNvPr().setPh(new CTPlaceholder());
                    if(type == STPlaceholderType.TITLE || type == STPlaceholderType.CTR_TITLE)
                            scratch.getNvSpPr().getNvPr().getPh().setType(type);
                    if(idx>0)
                            scratch.getNvSpPr().getNvPr().getPh().setIdx(Long.valueOf(idx));}
            return scratch;
    }

    CTTextBody createTextBody(ArrayList<String> paras) {
            CTTextBody ctTB = new CTTextBody();
            ctTB.setBodyPr(new CTTextBodyProperties());
            //ctTB.getBodyPr().setRtlCol(Boolean.TRUE);
            //ctTB.getBodyPr().setAnchor(STTextAnchoringType.CTR);
            ctTB.setLstStyle(new CTTextListStyle());
            // create P
            List<CTTextParagraph> p = ctTB.getP();
            if(paras.size()==0){
                    paras = new ArrayList<String>();
                    paras.add("(Add Content)");
            }
            for(String str : paras){
                    p.add(createParagraph(str));
            }
            return ctTB;
    }

    CTTextParagraph createParagraph(String para) {
            CTTextParagraph ctTP = new CTTextParagraph();
            ctTP.setPPr(new CTTextParagraphProperties());
            ctTP.getEGTextRun().add(createRun(para));
            ctTP.setEndParaRPr(new CTTextCharacterProperties());
            ctTP.getEndParaRPr().setLang("en-US");
            //ctTP.getEndParaRPr().setDirty(Boolean.FALSE);
            return ctTP;
    }

    CTRegularTextRun createRun(String str) {
            CTRegularTextRun ctRTR = new CTRegularTextRun();
            ctRTR.setRPr(new CTTextCharacterProperties());
            ctRTR.getRPr().setLang("en-US");
            ctRTR.getRPr().setDirty(Boolean.FALSE);
            ctRTR.getRPr().setSmtClean(Boolean.FALSE);
            ctRTR.setT(str);
            return ctRTR;
    }

    String readFile(String path) throws IOException {
        FileInputStream stream = new FileInputStream(new File(path));
        try {
            FileChannel fc = stream.getChannel();
            MappedByteBuffer bb = fc.map(FileChannel.MapMode.READ_ONLY, 0, fc.size());
            /* Instead of using default, pass in a decoder. */
            return Charset.defaultCharset().decode(bb).toString();
        }
        finally {
            stream.close();
        }
    }

    private static String SHAPE_XML = 
        "<p:sp   xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:p=\"http://schemas.openxmlformats.org/presentationml/2006/main\">"
        + "<p:nvSpPr>"
        + "<p:cNvPr id=\"4\" name=\"Title 3\" />"
        + "<p:cNvSpPr>"
            + "<a:spLocks noGrp=\"1\" />"
        + "</p:cNvSpPr>"
        + "<p:nvPr />"
    + "</p:nvSpPr>"
    + "   <p:spPr>"
    + "      <a:xfrm>"
    + "        <a:off x=\"${offx}\" y=\"${offy}\" />"
    + "        <a:ext cx=\"${extcx}\" cy=\"${extcy}\" />"
    + "      </a:xfrm>"
    + "    </p:spPr>"
    + "<p:txBody>"
        + "<a:bodyPr />"
        + "<a:lstStyle />"
        + "<a:p>"
            + "<a:r>"
                + "<a:rPr lang=\"en-US\" smtClean=\"0\" />"
                + "<a:t>${content_text}</a:t>"
            + "</a:r>"
            + "<a:endParaRPr lang=\"en-US\" />"
        + "</a:p>"
    + "</p:txBody>"
    + "</p:sp>";

    private static String PICTURE_XML =
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

    public static void main(String[] args) throws Exception {
//        String outputfilepath = System.getProperty("user.dir") + "/pptx-test.pptx";
        String outputfilepath = "d:\\pptx-test.pptx";
        PptxGenerator g = new PptxGenerator();
        SlidePart slide1 = g.createTwoContentSlide();
        g.addTitle(slide1, "Das Title");
        g.addImage(slide1, System.getProperty("user.dir") + "/1.png", 4514812, 1071812, 4014375, 4014375);
        g.addImage(slide1, System.getProperty("user.dir") + "/2.png", 8214812, 107181, 704375, 1004375);
        g.addImage(slide1, System.getProperty("user.dir") + "/3.png", 8414812, 5307181, 754375, 404375);
        ArrayList<String> contents = new ArrayList<String>();
        contents.add("Your");
        contents.add("stuff");
        contents.add("here");
        g.addContent1(slide1, contents);
        g.addTextShape(slide1, "Company in Confidence", 114812, 5071812, 4014375, 514375);
        SlidePart slide2 = g.createStandardSlide();
        g.addTitle(slide2, "Check it out, a graph!");
        g.addImage(slide2, System.getProperty("user.dir") + "/1.png", 514812, 1071812, 8514375, 4014375);
        g.addImage(slide2, System.getProperty("user.dir") + "/2.png", 8214812, 107181, 704375, 1004375);
        g.addImage(slide2, System.getProperty("user.dir") + "/3.png", 8414812, 5307181, 754375, 404375);
        g.addTextShape(slide2, "Company in Confidence", 114812, 5071812, 4014375, 514375);
//        g.save(outputfilepath);
        SlidePart slide3 = g.createStandardSlide();
        g.addTitle(slide3, "I can haz text under mai graph!?");
        g.addImage(slide3, System.getProperty("user.dir") + "/2.png", 514812, 1071812, 8514375, 2014375);
        g.addImage(slide3, System.getProperty("user.dir") + "/1.png", 8214812, 107181, 704375, 1004375);
        g.addImage(slide3, System.getProperty("user.dir") + "/3.png", 8414812, 5307181, 754375, 404375);
        g.addTextShape(slide3, "Company in Confidence", 114812, 5071812, 4014375, 514375);
        g.addTextShape(slide3, "I can write maaaaaaaaaaaaaaannnnnnnnnyyyyyyyyyy thingssss\n In moar lines", 514812, 3271812, 8514375, 1814375);
        g.save(outputfilepath);
    }
}