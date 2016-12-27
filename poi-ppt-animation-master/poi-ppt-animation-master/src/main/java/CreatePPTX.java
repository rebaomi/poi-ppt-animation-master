import java.io.File;

import org.docx4j.openpackaging.packages.PresentationMLPackage;
import org.docx4j.openpackaging.parts.PartName;
import org.docx4j.openpackaging.parts.PresentationML.MainPresentationPart;
import org.docx4j.openpackaging.parts.PresentationML.SlideLayoutPart;
import org.docx4j.openpackaging.parts.PresentationML.SlidePart;

public class CreatePPTX {
	
	public static void main(String[] args) throws Exception {
		String outputfilepath = "D://pptx-test.pptx";

		// 创建文档的主体
		PresentationMLPackage presentationMLPackage = PresentationMLPackage.createPackage();
		// 获取MainPresentationPart，实际上使用
		// presentationMLPackage.getMainPresentationPart(); 方法也可以

		MainPresentationPart pp = (MainPresentationPart) presentationMLPackage.getParts().getParts()
				.get(new PartName("/ppt/presentation.xml"));

		// 获取布局信息，实际上是获取幻灯片母版的布局页，这个功能很重要。
		// 创建一个新页时必须应用一个布局
		// "/ppt/slideLayouts/slideLayout1.xml"这个是母版页的id，具体要看母版中有多少布
		// 局样式，是1、2、3、4依次排列的
		SlideLayoutPart layoutPart = (SlideLayoutPart) presentationMLPackage.getParts().getParts()
				.get(new PartName("/ppt/slideLayouts/slideLayout1.xml"));

		// 创建一个新页，一定要带上布局页信息，否则打开ppt时会报错，
		// 并且自动指定一个默认的布局样式
		// "/ppt/slides/slide1.xml" 每一页的partName不能重复
		SlidePart slidePart = PresentationMLPackage.createSlidePart(pp, layoutPart,
				new PartName("/ppt/slides/slide1.xml"));

		// 保存成文件
		presentationMLPackage.save(new File(outputfilepath));

		System.out.println("\n\n done .. saved " + outputfilepath);
	}
}