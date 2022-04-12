package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

type OAuthAccessResponse struct {
	AccessToken string `json:"access_token"`
}

func OauthHandler(w http.ResponseWriter, r *http.Request) {
	httpClient := http.Client{}

	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")

	err := r.ParseForm()
	if err != nil {
		fmt.Fprintf(os.Stdout, "could not parse query: %v", err)
		w.WriteHeader(http.StatusBadRequest)
	}
	code := r.FormValue("code")

	// Next, lets for the HTTP request to call the github oauth enpoint
	// to get our access token
	reqURL := fmt.Sprintf("https://www.figma.com/api/oauth/token?grant_type=authorization_code&scope=file_read&redirect_uri=http://localhost:8080/oauth/callback&client_id=%s&client_secret=%s&code=%s", clientID, clientSecret, code)
	req, err := http.NewRequest(http.MethodPost, reqURL, nil)
	if err != nil {
		fmt.Fprintf(os.Stdout, "could not create HTTP request: %v", err)
		w.WriteHeader(http.StatusBadRequest)
	}
	// We set this header since we want the response
	// as JSON
	req.Header.Set("accept", "application/json")

	// Send out the HTTP request
	res, err := httpClient.Do(req)
	if err != nil {
		fmt.Fprintf(os.Stdout, "could not send HTTP request: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	defer res.Body.Close()

	// Parse the request body into the `OAuthAccessResponse` struct
	var t OAuthAccessResponse
	if err := json.NewDecoder(res.Body).Decode(&t); err != nil {
		fmt.Fprintf(os.Stdout, "could not parse JSON response: %v", err)
		w.WriteHeader(http.StatusBadRequest)
	}

	log.Println(t.AccessToken)
	cookie := http.Cookie{Name: "figma_access_token", Value: t.AccessToken, Path: "/"}

	http.SetCookie(w, &cookie)

	// Finally, send a response to redirect the user to the "welcome" page
	// with the access token
	w.Header().Set("Location", "/")
	w.WriteHeader(http.StatusFound)
}
