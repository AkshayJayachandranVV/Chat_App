import { environment } from "../environment/environment"

const BACKEND_URL = environment.BACKEND_URL

export const EndPoints = {
      signup : `${BACKEND_URL}/user/signup`,
      login : `${BACKEND_URL}/user/login`,
      profile : `${BACKEND_URL}/user/profile`,
      chatUsers : `${BACKEND_URL}/chat/chatUsers`,
}