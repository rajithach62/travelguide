import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

const apiConstantPosts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

// Replace your code here
class App extends Component {
  state = {apiStatus: apiConstantPosts.initial, travelList: []}

  componentDidMount() {
    this.getTravelList()
  }

  getTravelList = async () => {
    this.setState({apiStatus: apiConstantPosts.progress})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    if (response.ok) {
      const data = await response.json()
      const {packages} = data
      const fetchedDetails = packages.map(e => ({
        description: e.description,
        id: e.id,
        name: e.name,
        imageUrl: e.image_url,
      }))
      this.setState({travelList: fetchedDetails})
      this.setState({apiStatus: apiConstantPosts.success})
    }
  }

  viewSuccess = () => {
    const {travelList} = this.state
    return (
      <div>
        <ul className="list-cont">
          {travelList.map(e => (
            <li key={e.id} className="li-item">
              <img src={e.imageUrl} alt={e.name} className="img" />
              <h1 className="para-1">{e.name}</h1>
              <p className="para-2">{e.description}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  viewRender = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  allMethods = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantPosts.success:
        return this.viewSuccess()
      case apiConstantPosts.failure:
        return this.viewFailure()
      case apiConstantPosts.progress:
        return this.viewRender()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="head">Travel Guide</h1>
        {this.allMethods()}
      </div>
    )
  }
}

export default App
