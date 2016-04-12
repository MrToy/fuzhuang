package main

import (
	"./captcha"
	"flag"
	"os"
)

func main() {
	d := flag.String("str", "0000", "file id")
	flag.Parse()
	c, _ := captcha.New("font.ttf")
	c.Draw(os.Stdout, *d)
}
