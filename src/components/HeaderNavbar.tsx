import React from 'react'
import './HeaderNavbar.css'

const HeaderNavbar: React.FC = () => {
  return (
    <header className="reliable-header-wrapper">
      {/* Top Section */}
      <div className="top-header">
        <div className="brand-logo">
          <span className="brand-primary">Reliable</span>{' '}
          <span className="brand-secondary">Associates</span>
        </div>

        <div className="user-welcome">
          <span className="welcome-text">
            Welcome, <strong>shekharu.lab</strong>, BARAMATI Branch ADMIN,
          </span>
          <button className="btn-link">🔒Password</button>
          <button className="btn-logout">🔑Logout</button>
          <button className="btn-status">IN</button>
        </div>
      </div>

      {/* Stats Badges Section */}
      <div className="stats-container">
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Pre Online Broker/Cash</span>
            <span className="badge badge-blue">2</span>
            <span className="badge badge-darkblue">60741</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Pre E-Wallet</span>
            <span className="badge badge-blue">0</span>
            <span className="badge badge-darkblue">0</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Online Broker/Cash Approval</span>
            <span className="badge badge-blue">4</span>
            <span className="badge badge-darkblue">79977</span>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Insta Pay</span>
            <span className="badge badge-blue">88</span>
            <span className="badge badge-darkblue">1295364</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Quotation</span>
            <span className="badge badge-blue">12</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Attended</span>
            <span className="badge badge-blue">4</span>
          </div>

          <div className="stat-item highlight-red">Pre Cheque Approval</div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Cash Back Approval</span>
            <span className="badge badge-blue">75</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Pending Trans</span>
            <span className="badge badge-blue">27</span>
            <span className="badge badge-darkblue">244834</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Cust Cheq Deposit</span>
            <span className="badge badge-blue">2</span>
          </div>

          <div className="stat-item text-link">View Policy</div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Receiving Amt</span>
            <span className="badge badge-blue">36</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Send Link</span>
            <span className="badge badge-blue">21</span>
            <span className="badge badge-darkblue">124507</span>
          </div>

          <div className="stat-item text-link">Current Grid/ System Grid</div>

          <div className="stat-item text-link">Search posp by agent</div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">Support Request</span>
            <span className="badge badge-blue">0</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Completed Entries</span>
            <span className="badge badge-blue">38</span>
          </div>

          <div className="stat-item highlight-red">LOCK ID</div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-nav">
        <ul className="nav-row">
          <li><a href="#home">Home</a></li>
          <li className="dropdown">
            <a href="#branch">Branch Master ▾</a>
          </li>
          <li><a href="#policy">Policy Master</a></li>
          <li><a href="#vehicle">Vehicle Master</a></li>
          <li><a href="#user">User</a></li>
          <li><a href="#registration">Registration</a></li>
          <li><a href="#account-master">Account Master</a></li>
          <li><a href="#transaction">Transaction</a></li>
          <li><a href="#account">Account</a></li>
          <li><a href="#report">Report</a></li>
          <li><a href="#dashboard">DashBoard</a></li>
          <li><a href="#app">App</a></li>
          <li><a href="#non-motor">Non Motar</a></li>
          <li><a href="#target">Target</a></li>
          <li><a href="#franchise">Franchise</a></li>
        </ul>

        <ul className="nav-row sub-row">
          <li><a href="#mypage">My Page</a></li>
          <li><a href="#mis">MIS</a></li>
          <li><a href="#recon">Recon</a></li>
          <li><a href="#hr">HR Module</a></li>
          <li><a href="#claim">Claim</a></li>
          <li><a href="#renewal">Renewal</a></li>
          <li><a href="#commission">Commission Grid</a></li>
          <li><a href="#new-grid">New Grid Style</a></li>
          <li><a href="#sales">Sales</a></li>
          <li><a href="#others">Others</a></li>
          <li><a href="#business-master">Business Master</a></li>
          <li><a href="#support">Support</a></li>
          <li><a href="#posp">POSP</a></li>
          <li><a href="#calliber">Calliber Policy</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderNavbar
