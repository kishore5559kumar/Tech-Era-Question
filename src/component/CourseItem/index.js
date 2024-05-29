import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <li className="list-items">
      <Link to={`/courses/${id}`} className="link-styling">
        <div className="list-items">
          <img src={logoUrl} alt={name} className="course-item-image" />
          <h1 className="course-item-name">{name}</h1>
        </div>
      </Link>
    </li>
  )
}

export default CourseItem
