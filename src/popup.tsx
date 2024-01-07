function IndexPopup() {
  return (
    <div style={{ width: 180 }}>
      <p>
        Extension running at version {chrome.runtime.getManifest().version}
      </p>
    </div>
  )
}

export default IndexPopup
