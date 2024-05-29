import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import './index.css'

const courseApiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], courseApi: courseApiStatus.initial}

  componentDidMount() {
    this.getCourseList()
  }

  onclickCourseDetailsRetry = () => {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({courseApi: courseApiStatus.inProgress})
    const data = await fetch('https://apis.ccbp.in/te/courses')
    const response = await data.json()
    const updatedData = response.courses.map(eachCourse => ({
      id: eachCourse.id,
      name: eachCourse.name,
      logoUrl: eachCourse.logo_url,
    }))

    if (data.ok) {
      this.setState({
        courseList: updatedData,
        courseApi: courseApiStatus.success,
      })
    } else {
      this.setState({courseApi: courseApiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseListView = () => {
    const {courseList} = this.state

    return (
      <div className="course-card-container">
        <h1 className="course-head">Courses</h1>
        <ul className="course-list-items-container">
          {courseList.map(eachItem => (
            <CourseItem key={eachItem.id} courseDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderCourseFailureView = () => (
    <div className="course-list-failure-view">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="course-list-failure-view-image"
      />
      <h1 className="course-list-failure-view-head">
        Oops! Something Went Wrong
      </h1>
      <p className="course-list-failure-view-image">
        We cannot seem to find the page your looking for.
      </p>
      <button
        type="button"
        className="course-list-failure-retry-button"
        onClick={this.onclickCourseDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderCourseApi = () => {
    const {courseApi} = this.state

    switch (courseApi) {
      case courseApiStatus.inProgress:
        return this.renderLoadingView()
      case courseApiStatus.success:
        return this.renderCourseListView()
      case courseApiStatus.failure:
        return this.renderCourseFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="tech-era-courses-page-container">
        {this.renderCourseApi()}
      </div>
    )
  }
}

export default Home
