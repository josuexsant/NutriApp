DELIMITER $$

CREATE PROCEDURE guardar_paciente(
    IN p_nombres VARCHAR(50),
    IN p_apellido_pat VARCHAR(50),
    IN p_apellido_mat VARCHAR(50),
    IN p_edad TINYINT,
    IN p_genero CHAR(1),
    IN p_peso FLOAT(5,2),
    IN p_altura FLOAT(4,2),
    IN p_telefono VARCHAR(10),
    IN p_correo_electronico VARCHAR(50),
    IN p_contrasena VARCHAR(8)
)
BEGIN
    -- Declarar la variable para capturar el id del último paciente insertado
    DECLARE last_id INT;

    -- Validar que el correo sea único
    IF EXISTS (SELECT 1 FROM paciente_sesion WHERE correo_electronico = p_correo_electronico) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo electrónico ya está registrado.';
    END IF;

    -- Validaciones adicionales para nombre y apellidos
    IF p_nombres NOT REGEXP '^[A-Za-z ]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre debe contener solo letras y no puede estar vacío.';
    END IF;

    IF p_apellido_pat NOT REGEXP '^[A-Za-z]+$' OR p_apellido_pat IS NULL OR p_apellido_pat = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El primer apellido es obligatorio y debe contener solo letras.';
    END IF;

    IF p_apellido_mat IS NOT NULL AND p_apellido_mat != '' AND p_apellido_mat NOT REGEXP '^[A-Za-z]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El segundo apellido debe contener solo letras si se proporciona.';
    END IF;

    -- Validación de contraseña
    IF CHAR_LENGTH(p_contrasena) != 8 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La contraseña debe tener exactamente 8 caracteres.';
    END IF;

    -- Validación del teléfono
    IF CHAR_LENGTH(p_telefono) != 10 OR p_telefono NOT REGEXP '^[0-9]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El teléfono debe contener exactamente 10 dígitos numéricos.';
    END IF;

    -- Insertar en la tabla paciente
    INSERT INTO paciente (nombres, apellido_pat, apellido_mat, edad, genero, peso, altura, telefono)
    VALUES (p_nombres, p_apellido_pat, p_apellido_mat, p_edad, p_genero, p_peso, p_altura, p_telefono);

    -- Capturar el id del último registro insertado
    SET last_id = LAST_INSERT_ID();

    -- Insertar en la tabla paciente_sesion
    INSERT INTO paciente_sesion (id_paciente, correo_electronico, contrasena)
    VALUES (last_id, p_correo_electronico, p_contrasena);
END$$

DELIMITER ;

