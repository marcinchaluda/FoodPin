from dj_rest_auth.views import LoginView


class CustomLoginView(LoginView):
    def get_response(self):
        orginal_response = super().get_response()
        print(orginal_response)
        mydata = {"message": "some message", "status": "success"}
        orginal_response.data.update(mydata)
        return orginal_response