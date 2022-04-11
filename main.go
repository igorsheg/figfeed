package main

import (
	"embed"
	"log"
	"net/http"

	"github.com/igorsheg/figfeed/handlers"
	"github.com/joho/godotenv"
)

//go:embed web/www
var statics embed.FS

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	http.HandleFunc("/", handlers.SpaHandler("web/www", statics))
	http.HandleFunc("/oauth/callback", handlers.OauthHandler)

	log.Println("---> starting HTTP server at http://localhost:8080")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
