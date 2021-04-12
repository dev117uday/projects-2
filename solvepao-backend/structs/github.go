package structs

type GitHubUserInfo struct {
	UserName  string `json:"login"`
	AvatarURL string `json:"avatar_url"`
	Name      string `json:"name"`
	Location  string `json:"location"`
	Email     string `json:"email"`
}
