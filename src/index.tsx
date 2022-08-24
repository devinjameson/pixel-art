import { FC } from "react"
import { createRoot } from "react-dom/client"
import App from "App"

const AppContainer: FC = () => {
  return <App />
}

const container = document.getElementById("app")
const root = createRoot(container!)
root.render(<AppContainer />)
