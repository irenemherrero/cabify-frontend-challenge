import React, { Component } from 'react';
import cabifyLogo from './images/cabify-logo.svg';
import './styles/App.css';
import phonePrefixes from './PhonePrefixes';
import FlagIcon from 'react-flag-kit/lib/FlagIcon';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        fullname: '',
        jobdescription: '',
        prefix: '+34',
        phonenumber: '',
        email: '',
        website: 'www.cabify.com',
        address: '',
      },
      active: {
        fullname: false,
        jobdescription: false,
        prefix: true,
        phonenumber: false,
        email: false,
        website: true,
        address: false,
      },
      focus: {
        fullname: false,
        jobdescription: false,
        prefix: false,
        phonenumber: false,
        email: false,
        website: false,
        address: false,
      },
      activeSelect: false,
      submitButton: false,
      errorMail: false,
      errorPhone: false,
    }
    this.handleOpenSelect = this.handleOpenSelect.bind(this);
    this.handleChangeInputs = this.handleChangeInputs.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleActiveFocus = this.handleActiveFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.sendParams = this.sendParams.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.validateMail = this.validateMail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.setDefaultParams = this.setDefaultParams.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.handleClickSelect = this.handleClickSelect.bind(this);
    this.handleActivePrefixInput = this.handleActivePrefixInput.bind(this);
  }

  //Bring data from Local Storage
  //Save data from LocalStorage in state
  //Control input styles depending on data from Local Storage
  //Check if all data are completed to handle request button

  componentDidMount() {
    const cardData = JSON.parse(localStorage.getItem('cardData'))
    if (cardData) {
      this.setState({
        data: {
          fullname: cardData.fullname || '',
          jobdescription: cardData.jobdescription || '',
          prefix: cardData.prefix || '',
          phonenumber: cardData.phonenumber || '',
          email: cardData.email || '',
          website: cardData.website,
          address: cardData.address || '',
        },
        active: {
          fullname: cardData.fullname ? true : false,
          jobdescription: cardData.jobdescription ? true : false,
          prefix: cardData.prefix ? true : false,
          phonenumber: cardData.phonenumber ? true : false,
          email: cardData.email ? true : false,
          website: cardData.website ? true : false,
          address: cardData.address ? true : false,
        },
      }, () => {this.handleSubmitButton();
      });
    }
  }

  // Handle input styles (active, focus)

  handleActiveFocus(e) {
    const name = e.target.name;
    this.setState({
      active: {
        ...this.state.active,
        [name]: true,
      },
      focus: {
        ...this.state.focus,
        [name]: true,
      },
    });
  }

  // Handle custom select open/closed

  handleOpenSelect() {
    this.setState({
      activeSelect: !this.state.activeSelect,
    });
  }

  // Save input values in state
  // Handle submit button
  // Save data in LocalStorage

  handleChangeInputs(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    }, () => {
      this.handleSubmitButton();
      this.saveLocalStorage();
    }
    );
  }

  //Save prefix in state and hide select. Remove focus.
  //Handle submit button
  //Save data in Local Storage

  handleClickSelect(e) {
    const id = e.target.id;
    this.setState({
        data: {
          ...this.state.data,
          prefix: id,
        },
        activeSelect: !this.state.activeSelect,
        focus: {
          ...this.state.focus,
          prefix: false,
        },
      }, () => {
        this.handleActivePrefixInput(id);
        this.handleSubmitButton();
        this.saveLocalStorage();
      });
  }

  //Handle prefix input active when select is closed

  handleActivePrefixInput(id){
    id !== ''
    ? this.setState({
        active: {
          ...this.state.active,
          prefix: true,
        },
      })
    : this.setState({
        active: {
          ...this.state.active,
          prefix: false,
        },
      });
  }

  //Handle input styles (unactive, unfocused)

  handleBlur(e) {
    const name = e.target.name;
    const value = e.target.value;
    return !value
      ? this.setState({
        active: {
          ...this.state.active,
          [name]: false,
        },
        focus: {
          ...this.state.focus,
          [name]: false,
        },
      })
      : this.setState({
        active: {
          ...this.state.active,
          [name]: true,
        },
        focus: {
          ...this.state.focus,
          [name]: false,
        },
      });
  }

  // Handle select styles when clicking outside.

  //Set select as wrapper reference.

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  //Closing select when clicking outside.
  //Handle input styles when closing select depending on prefix value

  handleClickOutside(e) {
    !this.wrapperRef.contains(e.target)
      ? this.state.data.prefix !== ''
        ? this.setState({
          activeSelect: false,
          active: {
            ...this.state.active,
            prefix: true,
          },
          focus: {
            ...this.state.focus,
            prefix: false,
          },
        })
        : this.setState({
          activeSelect: false,
          active: {
            ...this.state.active,
            prefix: false,
          },
          focus: {
            ...this.state.focus,
            prefix: false,
          },
        })
      : null;
  }

  //Activate request button when all inputs are filled.

  handleSubmitButton() {
    const {
      fullname,
      jobdescription,
      prefix,
      phonenumber,
      email,
      website,
      address,
    } = this.state.data;
    fullname && jobdescription && prefix && phonenumber && email && website && address
      ? this.setState({
        submitButton: true,
      })
      : this.setState({
        submitButton: false,
      });
  }

  //Handle submit

  handleSubmit(e) {
    e.preventDefault();
    this.validateInputs()
      ? this.sendParams()
      : null
  }

  //Validation of inputs and control the sending of data.

  validateInputs() {
    this.validateMail();
    this.validatePhone();
    return this.validateMail() && this.validatePhone() ? true : false;
  }

  //Test that email has a valid format

  validateMail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.data.email)) {
      this.setState({
        errorMail: false,
      });
      return true
    } else {
      this.setState({
        errorMail: true,
      });
      return false
    }
  }

  //Test that phone number contains almost 9 numbers and only numbers

  validatePhone() {
    if (/^.[0-9]{8,}$/.test(this.state.data.phonenumber)) {
      this.setState({
        errorPhone: false,
      });
      return true;
    } else {
      this.setState({
        errorPhone: true,
      });
      return false
    }
  }

  //Function to send data and clear Local Storage. Here would be the request.

  sendParams() {
    this.setDefaultParams();
    this.clearLocalStorage();
    console.log('Data to send', this.state.data);
  }

  //Save data in Local Storage

  saveLocalStorage() {
    localStorage.setItem('cardData', JSON.stringify(this.state.data));
  }

  //Clear Local Storage when submit
  clearLocalStorage() {
    localStorage.clear();
  }

  //Set default data in Local Storage after sending data.

  setDefaultParams() {
    this.setState({
      data: {
        fullname: '',
        jobdescription: '',
        prefix: '+34',
        phonenumber: '',
        email: '',
        website: 'www.cabify.com',
        address: '',
      }
    });
  }

  render() {
    const {
      fullname,
      jobdescription,
      prefix,
      phonenumber,
      email,
      website,
      address,
    } = this.state.data;

    return (
      <div className="mainWrapper row" onMouseDown={this.handleClickOutside}>
        <article className="businessCard col col6">
          <figure className="businessCard-badge">
            <a className="businessCard-badge-logo" href="http://www.cabify.com">
              <img src={cabifyLogo} alt="Cabify" />
            </a>
          </figure>
          <h1 className="title-main">Request your business card</h1>
          <div className="businessCard-cards">
            <div className="businessCard-cardBack" />
            <div className="businessCard-cardFront">
              <div>
                <p className="businessCard-cardFront-title">{fullname}</p>
                <p className="businessCard-cardFront-subtitle">{jobdescription}</p>
              </div>
              <div className="businessCard-cardFront-bottom">
                <p className="businessCard-icon-phone">{prefix} {phonenumber}</p>
                <p className="businessCard-icon-email">{email}</p>
                <p className="businessCard-icon-website">{website}</p>
                <p className="businessCard-icon-address">{address}</p>
              </div>
            </div>
          </div>
        </article>
        <article className="builder col col6">
          <form className="form" action="">
            <div className="row">
              <div className={`formField-input col col12 
                ${this.state.active.fullname ? "active" : ''} 
                ${this.state.focus.fullname ? "focus" : ''}`}
              >
                <div className="input">
                  <input 
                    type="text" 
                    name="fullname" 
                    value={fullname} 
                    onChange={this.handleChangeInputs} 
                    onFocus={this.handleActiveFocus} 
                    onBlur={this.handleBlur} 
                  />
                  <label htmlFor="fullname">Full name</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className={`formField-input col col12 
                ${this.state.active.jobdescription ? "active" : ''} 
                ${this.state.focus.jobdescription ? "focus" : ''}`}
              >
                <div className="input">
                  <input 
                    type="text" 
                    name="jobdescription" 
                    value={jobdescription} 
                    onChange={this.handleChangeInputs} 
                    onFocus={this.handleActiveFocus} 
                    onBlur={this.handleBlur} 
                  />
                  <label htmlFor="jobdescription">Job description</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium row-gutterMedium">
              <div 
                ref={this.setWrapperRef} 
                className={`formField-select col col3 
                  ${this.state.active.prefix ? 'active' : ''} 
                  ${this.state.focus.prefix ? 'focus' : ''} 
                  ${this.state.activeSelect ? 'arrow-up' : 'arrow-down'}`} 
                onClick={this.handleOpenSelect}>
                <div className="select">
                  <input 
                    id="phone_prefix"
                    type="text"
                    name="prefix"
                    value={prefix}
                    maxLength="4"
                    className="select-input"  
                    onChange={this.handleChangeInputs} 
                    onFocus={this.handleActiveFocus} 
                  />
                  <label htmlFor="phone_prefix">Prefix</label>
                  <div className={`popup ${this.state.activeSelect ? 'open' : ''}`}>
                    <ul className="select-group-list">
                      {phonePrefixes.map(option => {
                        return (
                          <div className="select-option-container" key={option.prefix}>
                            <li 
                              key={option.prefix} 
                              className="select-option" 
                              id={option.prefix} 
                              onClick={this.handleClickSelect}>
                              <span className="select-option-container-small" id={option.prefix}>
                                <span className="select-option-span" id={option.prefix}></span>
                                <FlagIcon 
                                  className="select-option-flag" 
                                  code={option.countryCode} 
                                  size={20} 
                                />
                                <span className={`select-option-country${this.state.data.prefix === option.prefix ? '-selected' : ''}`} id={option.prefix}>{option.country}</span>
                              </span>
                              <span className="select-option-prefix" id={option.prefix}>{option.prefix}</span>
                            </li>
                          </div>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`formField-input col col9
                ${this.state.errorPhone ? 'input-error' : ''}  
                ${this.state.active.phonenumber ? "active" : ''} 
                ${this.state.focus.phonenumber ? "focus" : ''} 
                ${this.state.errorPhone ? "error" : ''}`}>
                <div className="input">
                  <input 
                    type="tel" 
                    name="phonenumber" 
                    value={phonenumber} 
                    maxLength="9" 
                    onChange={this.handleChangeInputs} 
                    onFocus={this.handleActiveFocus} 
                    onBlur={this.handleBlur} 
                  />
                  <label htmlFor="phonenumber">Phone number</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className={`formField-input col col12
                ${this.state.errorMail ? 'input-error' : ''}  
                ${this.state.active.email ? "active" : ''} 
                ${this.state.focus.email ? "focus" : ''} 
                ${this.state.errorMail ? "error" : ''}`}>
                <div className="input">
                  <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={this.handleChangeInputs} 
                    onFocus={this.handleActiveFocus} 
                    onBlur={this.handleBlur} 
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className="formField-input active disabled col col12">
                <div className="input">
                  <input 
                    type="text" 
                    name="website" 
                    value={website} 
                    disabled 
                  />
                  <label htmlFor="website">Website</label>
                </div>
              </div>
            </div>
            <div className="row row-separationMedium">
              <div className={`formField-input col col12 
                ${this.state.active.address ? "active" : ''} 
                ${this.state.focus.address ? "focus" : ''}`} 
              >
                <div className="input">
                  <input 
                    type="text" 
                    name="address" 
                    value={address} 
                    onChange={this.handleChangeInputs} 
                    onFocus={this.handleActiveFocus} 
                    onBlur={this.handleBlur} />
                  <label htmlFor="address">Address</label>
                </div>
              </div>
            </div>
            <div className="row row-separationHuge">
              <input 
                className={`button button-full button-primary ${!this.state.submitButton ? 'disabled' : ''}`} 
                type="submit" 
                value="Request" 
                onClick={this.handleSubmit} 
              />
            </div>
          </form>
        </article>
      </div>
    );
  }
}

export default App;
