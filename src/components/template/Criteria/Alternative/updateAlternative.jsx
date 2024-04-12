import api from '../../../../config/api'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const UpdateAlternative = ({ func, id, title }) => {

  const submitUpdate = async (e) => {
    e.preventDefault()
    const data = { title: e.target.title.value }
    try {
      await api.put('/alternative/'+id, data)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil mengubah alternatif'
      })
      func()
    } catch(err) {
      Swal.fire({
        icon: 'error',
        text: 'Gagal mengubah alternatif'
      })
    }
  }

  return (
    <div className="modal fade" id="updateAlternative" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={submitUpdate} className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Alternative</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type='text' name='title' className="form-control" placeholder="Nama Alternatif" defaultValue={title}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">OK</button>
          </div>
        </form>
      </div>
    </div>
  )
}

UpdateAlternative.propTypes = {
  func: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string
}

export default UpdateAlternative