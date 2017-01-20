

import java.awt.Dimension;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.xslf.usermodel.XMLSlideShow;

import com.eyuanku.web.framework.ppt.page.PptPage;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class DesignPptBean {
	
	// ppt的页面尺寸  width*height
	private Dimension dimension;
	
	// ppt的title
	private String title;
	
	private String version;

	private boolean isBleed = false;
	
	private List<PptPage> pages;

	private DesignPptBean(Dimension dimension, String title, String version, boolean isBleed, List<PptPage> pages) {
		this.dimension = dimension;
		this.title = title;
		this.version = version;
		this.isBleed = isBleed;
		this.pages = pages;
	}

	public static DesignPptBean createInstance(Dimension dimension, String designJsonStr) {
		DesignPptBean bean = null;
		JSONObject designJson = null;
		try {
			designJson = JSONObject.fromObject(designJsonStr);
			if (designJson == null) {
				return bean;
			}
		} catch (Exception e) {
			return bean;
		}

		String pptTitle = "默认标题";
		String version = "";
		boolean isBleed = false;
		JSONArray pagesJson = null;
		try {
			pptTitle = designJson.getString("title");
			version = designJson.getString("v");
			pagesJson = designJson.getJSONArray("pages");
			isBleed = designJson.getBoolean("bleed");
		} catch (Exception e) {
			return bean;
		}

		if (pagesJson == null || pagesJson.size() <= 0) {
			return bean;
		}

		List<PptPage> pptPages = createPages(pagesJson);
		if (pptPages.size() <= 0) {
			return bean;
		}
		bean = new DesignPptBean(dimension, pptTitle, version, isBleed, pptPages);
		
		return bean;

	}

	private static List<PptPage> createPages(JSONArray pagesJson) {
		List<PptPage> pptPages = new ArrayList<PptPage>();
		for (int i = 0; i < pagesJson.size(); i++) {
			PptPage page = null;
			try {
				page = new PptPage(pagesJson.getJSONObject(i));
			} catch (Exception e) {

			}
			if (page != null) {
				pptPages.add(page);
			}
		}
		return pptPages;
	}

	public Dimension getDimension() {
		return dimension;
	}

	public String getTitle() {
		return title;
	}

	public String getVersion() {
		return version;
	}

	public boolean isBleed() {
		return isBleed;
	}

	public List<PptPage> getPages() {
		return pages;
	}
	
	public XMLSlideShow toPpt() {
		XMLSlideShow ppt = new XMLSlideShow();
		ppt.setPageSize(dimension); 
		
		int pageSize = pages.size();
		for (int i = 0; i < pageSize; i++) {
			PptPage page = pages.get(i);
			page.toPpt(ppt);
		}
		
		return ppt;
	}
	
	public void generatePPT() throws IOException{
		XMLSlideShow ppt = toPpt();
		FileOutputStream out = new FileOutputStream("E:\\slideshow.pptx");
		ppt.write(out);  
		out.close(); 
	}
	
}
