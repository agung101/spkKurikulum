import Swal from 'sweetalert2'

const confirmAlert = async ( title = 'Apakah anda yakin' ) => {
  return Swal.fire({
    title,
    icon: 'question',
    confirmButtonText: '<span style="margin: 0 10px">Ya</span>',
    confirmButtonColor: '#3085d6',
    showCancelButton: true,
    cancelButtonText: 'Tidak',
    cancelButtonColor: '#d33',
    reverseButtons: true,
  }).then((result) => {
    return result.isConfirmed
  })
}

export default confirmAlert