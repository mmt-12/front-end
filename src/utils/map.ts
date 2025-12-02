export function getDistanceBetween (
  latLng1: google.maps.LatLng,
  latLng2: google.maps.LatLng,
) {
  const R = 6371e3 // meters
  const φ1 = latLng1.lat() * (Math.PI / 180)
  const φ2 = latLng2.lat() * (Math.PI / 180)
  const Δφ = (latLng2.lat() - latLng1.lat()) * (Math.PI / 180)
  const Δλ = (latLng2.lng() - latLng1.lng()) * (Math.PI / 180)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
