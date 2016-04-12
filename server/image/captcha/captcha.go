package captcha

import (
	"github.com/golang/freetype"
	"github.com/golang/freetype/truetype"
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"io"
	"io/ioutil"
)

type Captcha struct {
	font     *truetype.Font
	bgimg    image.Image
	rect     image.Rectangle
	fontsize float64
}

func (this *Captcha) Draw(w io.Writer, str string) {
	mask := image.NewRGBA(this.rect)
	c := freetype.NewContext()
	c.SetFont(this.font)
	c.SetFontSize(this.fontsize)
	c.SetClip(this.rect)
	c.SetDst(mask)
	c.SetSrc(image.Black)
	c.DrawString(str, freetype.Pt(5, int(this.fontsize)))
	dst := image.NewRGBA(this.rect)
	draw.DrawMask(dst, this.rect, this.bgimg, image.ZP, mask, image.ZP, draw.Over)
	png.Encode(w, dst)
}
func NewBg(rect image.Rectangle) image.Image {
	img := image.NewRGBA(rect)
	for x := 0; x < rect.Dx(); x++ {
		for y := 0; y < rect.Dy(); y++ {
			img.Set(x, y, color.RGBA{uint8(150 + 105*y/rect.Dx()), uint8(50 + 205*x/rect.Dx()), 0, 255})
		}
	}
	return img
}
func New(fontPath string) (*Captcha, error) {
	fontBytes, err := ioutil.ReadFile(fontPath)
	if err != nil {
		return nil, err
	}
	font, err := freetype.ParseFont(fontBytes)
	if err != nil {
		return nil, err
	}
	rect := image.Rect(0, 0, 110, 50)
	return &Captcha{font, NewBg(rect), rect, float64(rect.Dy()) * 3 / 4}, nil
}
