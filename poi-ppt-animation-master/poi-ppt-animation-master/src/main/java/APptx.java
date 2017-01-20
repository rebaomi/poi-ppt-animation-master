public abstract class APptx implements IPptx{
	
	public static String getTextArea(String preset,String fontFamily, String fontSize, String x, String y, String cx, String cy) {
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
	
	public static String SAMPLE_PICTURE = 			
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
