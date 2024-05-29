import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const courseItemApiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    courseItemList: [],
    courseItemApi: courseItemApiStatus.initial,
  }

  componentDidMount() {
    this.getCourseItemDetails()
  }

  onclickCourseItemDetailsRetry = () => {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({courseItemApi: courseItemApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseData = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const courseResponse = await courseData.json()
    const courseUpdatedData = {
      id: courseResponse.course_details.id,
      name: courseResponse.course_details.name,
      description: courseResponse.course_details.description,
      imageUrl: courseResponse.course_details.image_url,
    }

    if (courseData.ok) {
      this.setState({
        courseItemList: courseUpdatedData,
        courseItemApi: courseItemApiStatus.success,
      })
    }
    if (courseData.status === 404) {
      this.setState({courseItemApi: courseItemApiStatus.failure})
    }
    console.log(courseData)
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseItemDetailsView = () => {
    const {courseItemList} = this.state
    const {name, description, imageUrl} = courseItemList

    return (
      <div className="course-item-details-card">
        <img src={imageUrl} alt={name} className="course-item-details-image" />
        <div className="course-name-and-description-container">
          <h1 className="course-item-details-head">{name}</h1>
          <p className="course-item-details-desc">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseItemFailureView = () => (
    <div className="course-failure-view">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="course-failure-view-image"
      />
      <h1 className="course-failure-view-head">Oops! Something Went Wrong</h1>
      <p className="course-failure-view-desc">
        We cannot seem to find the page your looking for.
      </p>
      <button
        type="button"
        className="course-failure-retry-button"
        onClick={this.onclickCourseItemDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderCourseItemApi = () => {
    const {courseItemApi} = this.state

    switch (courseItemApi) {
      case courseItemApiStatus.inProgress:
        return this.renderLoadingView()
      case courseItemApiStatus.success:
        return this.renderCourseItemDetailsView()
      case courseItemApiStatus.failure:
        return this.renderCourseItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-item-details-container">
        {this.renderCourseItemApi()}
      </div>
    )
  }
}

export default CourseItemDetails
