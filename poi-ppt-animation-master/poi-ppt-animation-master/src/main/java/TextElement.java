import java.io.Serializable;

public class TextElement implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String content;
	
	private String fontFamily;
	
	private String fontSize;
	
	private long offx;
	
	private long offy;
	
	private long extcx;
	
	private long extcy;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getFontFamily() {
		return fontFamily;
	}

	public void setFontFamily(String fontFamily) {
		this.fontFamily = fontFamily;
	}

	public String getFontSize() {
		return fontSize;
	}

	public void setFontSize(String fontSize) {
		this.fontSize = fontSize;
	}

	public long getOffx() {
		return offx;
	}

	public String getOffxString(){
		return Long.toString(offx);
	}
	
	public void setOffx(long offx) {
		this.offx = offx;
	}
	
	public long getOffy() {
		return offy;
	}
	
	public String getOffyString(){
		return Long.toString(offy);
	}

	public void setOffy(long offy) {
		this.offy = offy;
	}

	public long getExtcx() {
		return extcx;
	}

	public String getExtcxString(){
		return Long.toString(extcx);
	}
	
	public void setExtcx(long extcx) {
		this.extcx = extcx;
	}

	public long getExtcy() {
		return extcy;
	}

	public String getExtcyString(){
		return Long.toString(extcy);
	}
	
	public void setExtcy(long extcy) {
		this.extcy = extcy;
	}
	
}
