import api from '../../../../config/api'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const AddAlternative = ({ func }) => {
  const submitAlternative = async (e) => {
    e.preventDefault()
    const data = { title: e.target.alternative.value }
    try {
      await api.post('/alternative', data)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil menambahkan alternatif'
      })
      func()
    } catch(err) {
      Swal.fire({
        icon: 'error',
        text: 'Gagal menambahkan alternatif'
      })
    }
  }

  return (
    <div className="modal fade" id="addAlternative" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={submitAlternative} className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Alternative</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type='text' name='alternative' className="form-control" placeholder="Nama Alternatif" />
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

AddAlternative.propTypes = {
  func: PropTypes.func
}

export default AddAlternative