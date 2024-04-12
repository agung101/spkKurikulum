import api from '../../../../config/api'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const AddCriteria = ({ func }) => {
  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

  const submitCriteria = async (e) => {
    e.preventDefault()
    const data = { 
      title: e.target.title.value,
      weight: e.target.weight.value
    }
    try {
      await api.post('/criteria', data)
      Swal.fire({
        icon: 'success',
        title: 'Berhasil menambahkan criteria'
      })
      func()
    } catch(err) {
      Swal.fire({
        icon: 'error',
        text: 'Gagal menambahkan criteria'
      })
    }
  }

  return (
    <div className="modal fade" id="addCriteria" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={submitCriteria} className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Criteria</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type='text' name='title' placeholder="Nama Kriteria" className="form-control mb-2" />
            <div className='w-100 d-flex align-items-center'>
              <input type='number' name='weight' placeholder="Bobot" onKeyDown={blockInvalidChar} className="form-control text-end" style={{ width: 70 }} />
              <p className='fs-5 mb-0 ms-2'>%</p>
            </div>            
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

AddCriteria.propTypes = {
  func: PropTypes.func
}

export default AddCriteria