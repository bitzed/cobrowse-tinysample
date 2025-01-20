# Zoom Cobrowse SDK Tiny Sample Application

## Setup Instructions

1. Clone the repository
2. Set up environment variables
3. Install dependencies
4. Run the application

## Detailed Steps
1. **Clone the repository**:
2. git clone `https://github.com/bitzed/cobrowse-tinysample.git`<br>
cd `cobrowse-tinysample`

1. **Set up environment variables**:
- Create a `.env` file in the project root directory with the following information:
  ```
  ZOOM_SDK_KEY=your_zoom_sdk_key
  ZOOM_SDK_SECRET=your_zoom_sdk_secret
  ```
  Also fill out `{YOUR_SDK_KEY}` in `./public/customer.html` with the same key.

1. **Install dependencies**:
<br> `npm install`

1. **Run the application**:
<br> `node index.js`

## Usage

- Open `http://localhost:8080` in your browser
- Access each of `customer.html` or `agent.html` to start a Cobrowse session

## Note
- Zoom Cobrowse SDK credentials are required. See [Our Docs](https://developers.zoom.us/docs/cobrowse-sdk/) for more details.
