export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: '#000',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '8rem' }}>404</h1>
      <p>We are lost.</p>
    </div>
  )
}
