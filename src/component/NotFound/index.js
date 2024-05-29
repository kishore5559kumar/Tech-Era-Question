import './index.css'

const NotFound = () => (
  <>
    <div className="notfound-page-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notfound-image"
      />
      <h1 className="notfound-head">Page Not Found</h1>
      <p className="notdound-desc">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
