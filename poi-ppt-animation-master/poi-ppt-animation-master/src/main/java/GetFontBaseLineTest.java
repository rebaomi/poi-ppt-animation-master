
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.Toolkit;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.geom.Rectangle2D;

import javax.swing.JFrame;
import javax.swing.JPanel;
public class GetFontBaseLineTest extends JPanel{
	private static final long serialVersionUID = -160117449327146673L;

    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);
        Font ft = new Font("SansSerif", 0, 200);
        g2.setFont(ft);
        // 获得字体宽度方法一
        FontMetrics fm = g2.getFontMetrics();
        Rectangle2D rc = fm.getStringBounds("By", g2);
        System.out.println("Width:" + rc.getWidth());
        Rectangle2D rcb = fm.getStringBounds("B", g2);
        System.out.println("Width:" + rcb.getWidth());
        Rectangle2D rcy = fm.getStringBounds("y", g2);
        System.out.println("Width:" + rcy.getWidth());
        // 获得字体宽度方法二
        FontMetrics fm2 = Toolkit.getDefaultToolkit().getFontMetrics(ft);// 已过时
        System.out.println("Width:" + fm2.stringWidth("By"));
        // /////////////////////////
        int baseline = 300;
        g2.drawString("By", 200, baseline);
        g2.setColor(Color.red);
        g2.setFont(new Font("SansSerif", 0, 15));
        // //////////////////////////////////////绘制宽度
        g2.drawLine(200, 0, 200, 800);
        g2.drawLine(200+(int) rcb.getWidth(), 0, 200+(int) rcb.getWidth(), 800);
        
        g2.drawLine(200 + (int) rc.getWidth(), 0, 200 + (int) rc.getWidth(),
                800);
        g2.drawString("Width", 200 + (int) rcb.getWidth() / 2-10, baseline + 58);
        g2.drawString("Width", 200 + (int) rcb.getWidth()+(int)rcy.getWidth() / 2-10, baseline + 58);
        // 可以看出Height = Ascent + Descent + Leading
        int ascent = fm.getAscent();
        int descent = fm.getDescent();
        int leading = fm.getLeading();
        int height = fm.getHeight();
        System.out.printf(
                "Height = %d\tAscent = %d\tDescent = %d\tLeading = %d", height,
                ascent, descent, leading);
        System.out.println();
        // 在文字上绘制每一个常量，用一条横线予以标注
        g2.drawLine(100, baseline, 500, baseline);
        g2.drawLine(100, baseline - ascent, 500, baseline - ascent);
        g2.drawLine(100, baseline + descent, 500, baseline + descent);
        g2.drawLine(100, baseline - ascent - leading, 500, baseline - ascent
                - leading);
        // 指出基线的位置，和其他常量作用的范围。
        g2.drawString("Baseline", 510, baseline);
        g2.drawLine(480, baseline - ascent, 480, baseline);
        // 绘出Ascent的范围
        g2.drawString("Ascent", 510, baseline - ascent / 2);
        g2.drawLine(480, baseline, 480, baseline + descent);
        // 绘出Descent的范围
        g2.drawString("Descent", 510, baseline + descent / 2);
        // 绘出Leading的范围
        g2.drawLine(480, baseline - ascent, 480, baseline - ascent - leading);
        g2.drawString("Leading", 510, baseline - ascent - leading / 2);
        // 绘出Height的范围
        g2.drawLine(100, baseline - ascent - leading, 100, baseline + descent);
        g2.drawString("Height", 30, baseline - ascent - leading + height / 2);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame();
        frame.setTitle("Show Font's Metrics Info");
        frame.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
        frame.setContentPane(new GetFontBaseLineTest());
        frame.setSize(800, 500);
        frame.setVisible(true);
    }
}
