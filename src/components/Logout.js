import auth from "../services/auth";

export default function Logout() {
    return render(
        auth.logout()
    )
}