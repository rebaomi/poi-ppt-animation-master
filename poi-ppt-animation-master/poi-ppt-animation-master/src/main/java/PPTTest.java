

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Rectangle;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.sl.usermodel.PictureData.PictureType;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFPictureData;
import org.apache.poi.xslf.usermodel.XSLFPictureShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFTextBox;
import org.apache.poi.xslf.usermodel.XSLFTextParagraph;
import org.apache.poi.xslf.usermodel.XSLFTextRun;

import com.eyuanku.web.framework.ppt.element.background.BackgroundElement;
import com.eyuanku.web.framework.ppt.element.image.ImageElement;
import com.eyuanku.web.framework.ppt.element.svg.SvgImageElement;
import com.eyuanku.web.framework.ppt.element.text.TextElement;

public class PPTTest {

	void createPpt(DesignPptBean designPptBean){
		
		XMLSlideShow ppt = new XMLSlideShow();
		ppt.setPageSize(designPptBean.getDimension());  
	}
	
	void createSlide(XMLSlideShow ppt){
		XSLFSlide slide = ppt.createSlide();
	}
	
	void setBackground(XMLSlideShow ppt, XSLFSlide slide, BackgroundElement bgElem) throws IOException{
		InputStream in = new FileInputStream("d:\\bk4.png");
		byte[] pictureData = IOUtils.toByteArray(in);
		// 将图片加到ppt的该页
		XSLFPictureData pd = ppt.addPicture(pictureData, PictureType.PNG);
		XSLFPictureShape pic = slide.createPicture(pd);
		// 设置图片的大小及位置
		pic.setAnchor(getRect(0, 0, 1024, 768));
	}

	void addText(XMLSlideShow ppt, XSLFSlide slide, TextElement textElem){
		XSLFTextBox shape = slide.createTextBox();
		
		// 设置字体的位置
		shape.setAnchor(getRect(0, 0, 200, 200)); // width height
		// 设置字体的旋转
		shape.setRotation(20);
		// 创建一个文本段落，超过TextBox的宽之后自动换行，每个新段落重新换行
		XSLFTextParagraph p = shape.addNewTextParagraph();
	    
	    XSLFTextRun r1 = p.addNewTextRun();
	    
	    r1.setText("The哇咔咔");
	    r1.setFontColor(Color.blue); // fill  将16进制颜色转换成十进制
	    r1.setFontSize(24.); // font-size
	    // TODO 中文字体还有问题（指的是给中文设置字体）~~~~以后解决，终于知道以前做不出来了！！！
	    r1.setFontFamily("仿宋"); // font-family
	}
	
	void addPicture(XMLSlideShow ppt, XSLFSlide slide, ImageElement imgElem) throws IOException{
		InputStream in = new FileInputStream("d:\\bk4.png");
		byte[] pictureData = IOUtils.toByteArray(in);
		// 将图片加到ppt的该页
		XSLFPictureData pd = ppt.addPicture(pictureData, PictureType.PNG);
		XSLFPictureShape pic = slide.createPicture(pd);
		// 设置图片的大小及位置
		pic.setAnchor(getRect(0, 0, 1024, 768));
	}
	
	void addSVG(XMLSlideShow ppt, XSLFSlide slide, SvgImageElement svgImgElem){
		
	}
	
	public static void main(String[] args) throws IOException {
		XMLSlideShow ppt = new XMLSlideShow();
		int width = 1024;
		int height = 768;
		Dimension dd = new Dimension(width,height);
		ppt.setPageSize(dd);  
		
		// 创建一页幻灯片
		XSLFSlide blankSlide = ppt.createSlide();
		
		// TODO 设置背景的方案 ：设置ppt的背景颜色  添加一张纯背景的图片或者生成一个只有背景的空svg转换成png！！！！！！！！

		// 获取图片byte数据
//		InputStream in = new FileInputStream("d:\\bk4.png");
//		byte[] pictureData = IOUtils.toByteArray(in);
//		setBackground(ppt, blankSlide, pictureData);
		
		
		XSLFTextBox shape = blankSlide.createTextBox();
//		shape.setFillColor(Color.red);// 没什么卵用,网站上没有这个功能
		// 设置字体的位置
		shape.setAnchor(getRect(0, 0, 200, 200));
		// 设置字体的旋转
		shape.setRotation(20);
		// 创建一个文本段落，超过TextBox的宽之后自动换行，每个新段落重新换行
		XSLFTextParagraph p = shape.addNewTextParagraph();
	    
	    XSLFTextRun r1 = p.addNewTextRun();
	    
	    r1.setText("The哇咔咔");
	    r1.setFontColor(Color.blue);
	    r1.setFontSize(24.);
	    // TODO 中文字体还有问题（指的是给中文设置字体）~~~~以后解决
	    r1.setFontFamily("仿宋");
	    XSLFTextRun r2 = p.addNewTextRun();
	    r2.setText("哈哈哈");
	    
//	    r2.setBold(true);
//	    r3.setItalic(true);
//	    r3.setStrikethrough(true);
//	    r4.setUnderline(true);
//		// 设置字体的旋转
//		second.setRotation(20);

	    
		FileOutputStream out = new FileOutputStream("E:\\slideshow.pptx");
		ppt.write(out);  
		out.close();  
		
	}
	
	private static void setBackground(XMLSlideShow ppt, XSLFSlide slide, byte[] pictureData){
		addPicture(ppt, slide, pictureData);

		// TODO 获得BufferedImage对象,用于获取宽高，前提是json中没有提供相应的宽高信息
//		ByteArrayInputStream in = new ByteArrayInputStream(pictureData); // 将b作为输入流；
//		BufferedImage img = ImageIO.read(in);
//		int width = img.getWidth();
//		int height = img.getHeight();
//		in.close();
	}
	
	/**
	 * 不能直接添加图片资源，需要将图片打包成svg进行png转换，因为有滤镜等效果编辑！！！！
	 * @param ppt
	 * @param slide
	 * @param pictureData
	 */
	private static void addPicture(XMLSlideShow ppt, XSLFSlide slide, byte[] pictureData){
		// 将图片加到ppt的该页
		XSLFPictureData pd = ppt.addPicture(pictureData, PictureType.PNG);
		XSLFPictureShape pic = slide.createPicture(pd);
		// 设置图片的大小及位置
		pic.setAnchor(getRect(0, 0, 1024, 768));
	}
	
	private static Rectangle getRect(int x, int y, int width, int height){
		return new java.awt.Rectangle(x, y, width, height);
	}
}
