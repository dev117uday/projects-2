package fn

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"solvepao-backend/config"
	"solvepao-backend/structs"
	"strings"
)

func GitHubAuth(codeAuth string) (string, error) {

	url := "https://github.com/login/oauth/access_token"
	method := "POST"

	payloadString := fmt.Sprintf(`{
		  "client_id": "%s",
		  "client_secret": "%s",
		  "code": "%s"
	  }`, config.GitHubId, config.GitHubSecret, codeAuth)

	payload := strings.NewReader(payloadString)
	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return "", errors.New("unable to create request")
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)

	if err != nil {
		fmt.Println(err)
		return "", errors.New("unable to send the request")
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		return "", errors.New("server error")
	}

	var resp map[string]interface{}
	json.NewDecoder(res.Body).Decode(&resp)

	token := fmt.Sprintf("%v", resp["access_token"])
	return token, nil

}

func GetGitHubUserInfo(token string) (*structs.GitHubUserInfo, error) {
	var userProfile structs.GitHubUserInfo

	url := "https://api.github.com/user"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return nil, errors.New("unable to create new request")
	}

	authString := fmt.Sprintf("token %s", token)

	req.Header.Add("Authorization", authString)

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return nil, errors.New("unable to send the request")
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return nil, errors.New("unable to parse the response")
	}

	json.Unmarshal(body, &userProfile)
	return &userProfile, nil
}
