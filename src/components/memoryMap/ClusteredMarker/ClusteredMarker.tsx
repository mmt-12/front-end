export default function ClusteredMarker({ count }: { count: number }) {
  return (
    <div
      style={{
        width: '42px',
        height: '42px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FEFEFA',
        border: `3px solid #00BCFF`,
        borderRadius: '50%',
      }}
    >
      <p
        style={{
          margin: 'auto',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#44403C',
        }}
      >
        {count}
      </p>
    </div>
  )
}
