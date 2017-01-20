import java.io.Serializable;

public class ImgElement implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7872398477164914039L;

	private String id1;
	private String name;
	private String descr;
	
	private String offx;
	private String offy;
	private String extcx; // cm * 360000  需要将px转换成cm
	private String extcy; 
	
	
    public String getId1() {
		return id1;
	}


	public void setId1(int id1) {
		this.id1 = Integer.toString(id1);
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescr() {
		return descr;
	}


	public void setDescr(String descr) {
		this.descr = descr;
	}


	public String getOffx() {
		return offx;
	}


	public void setOffx(String offx) {
		this.offx = offx;
	}


	public String getOffy() {
		return offy;
	}


	public void setOffy(String offy) {
		this.offy = offy;
	}


	public String getExtcx() {
		return extcx;
	}


	public void setExtcx(String extcx) {
		this.extcx = extcx;
	}


	public String getExtcy() {
		return extcy;
	}


	public void setExtcy(String extcy) {
		this.extcy = extcy;
	}



}
