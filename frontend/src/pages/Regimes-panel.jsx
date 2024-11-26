import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

export const RegimesPanel = () => {
  const navigate = useNavigate();


  // Datos de prueba para los regímenes
  const regimenes = [
    { id: 1, nombre: 'Regimen 1' },
    { id: 2, nombre: 'Regimen 2' },
    { id: 3, nombre: 'Regimen 3' },
    { id: 4, nombre: 'Regimen 4' },
  ];

  return (
    <MainLayout>
      <Container className="container-fluid vh-100 d-flex flex-column">
        <h2 className="text-center mt-5">Regímenes Panel</h2>
        <Row className="my-2">
          <Col>
            <Button variant="secondary" className="me-2">
              Archivados
            </Button>
            <Button onClick={() => navigate('/Regimen-por-tiempos')} variant="secondary">Añadir</Button>
          </Col>
        </Row>

        <Row className="my-4">
          {regimenes.map((regimen) => (
            <Col xs={12} key={regimen.id} className="mb-3">
              <div
                className="d-flex align-items-center justify-content-between p-3 shadow-sm"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <span>{regimen.nombre}</span>
                <div>
                  <Button variant="primary" className="me-2">
                    Ver detalles
                  </Button>
                  <Button variant="success">Archivar</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default RegimesPanel;
