import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import VaccinatonCoverage from '../VaccinationCoverage'

class CowinDashboard extends Component {
  // eslint-disable-next-line
  state = {
    last7daysvaccination: [],
    // eslint-disable-next-line
    vaccinationbygender: [],
    // eslint-disable-next-line
    vaccinationbyage: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getApicall()
  }

  getApicall = async () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({apiStatus: 'isprogess'})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    // eslint-disable-next-line react/no-unused-state

    const response = await fetch(url)

    const data1 = await response.json()
    console.log(data1)
    if (response.ok === true) {
      const last7daysvaccination = data1.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))

      const vaccinationbyage = data1.vaccination_by_age
      const vaccinationbygender = data1.vaccination_by_gender

      this.setState({
        last7daysvaccination,
        // eslint-disable-next-line
        vaccinationbyage,
        // eslint-disable-next-line
        vaccinationbygender,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  CallLoader = () => (
    <div className="bg-div">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  failureView = () => (
    <div className="failure-div">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
    </div>
  )

  successView = () => {
    const {last7daysvaccination} = this.state

    return <VaccinatonCoverage last7daysvaccination={last7daysvaccination} />
  }

  displayView = () => {
    const {apiStatus} = this.state
    if (apiStatus === 'success') {
      return this.successView()
    }
    if (apiStatus === 'failure') {
      return this.failureView()
    }
    return this.CallLoader()
  }

  render() {
    return (
      <div className="bg">
        <div className="header">
          <div className="logo">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            />
            <p>co-WIN</p>
          </div>
          <h1>coWIN vaccination in India</h1>
        </div>
        {this.displayView()}
      </div>
    )
  }
}

export default CowinDashboard
