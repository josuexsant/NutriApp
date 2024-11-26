DELIMITER $$

CREATE PROCEDURE guardar_paciente(
    IN p_nombres VARCHAR(50),
    IN p_apellido_pat VARCHAR(50),
    IN p_apellido_mat VARCHAR(50),
    IN p_fecha_nac DATE,
    IN p_genero CHAR(1),
    IN p_peso FLOAT(5,2),
    IN p_altura FLOAT(4,2),
    IN p_telefono VARCHAR(10),
    IN p_correo_electronico VARCHAR(50),
    IN p_contrasena VARCHAR(8),
    IN p_token VARCHAR(255)
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
    INSERT INTO paciente (nombres, apellido_pat, apellido_mat, fecha_nacimiento, genero, peso, altura, telefono)
    VALUES (p_nombres, p_apellido_pat, p_apellido_mat, p_fecha_nac, p_genero, p_peso, p_altura, p_telefono);

    -- Capturar el id del último registro insertado
    SET last_id = LAST_INSERT_ID();

    -- Insertar en la tabla paciente_sesion
    INSERT INTO paciente_sesion (id_paciente, correo_electronico, contrasena)
    VALUES (last_id, p_correo_electronico, p_contrasena);

        -- Capturar el id del último registro insertado
    SET last_id_tk = LAST_INSERT_ID();

    -- Insertar en la tabla token_paciente
    INSERT INTO tokens_paciente (id_sesion_paciente, token)
    VALUES (last_id_tk, p_correo_electronico, p_contrasena);
END$$

DELIMITER ;




DELIMITER $$

CREATE PROCEDURE verificar_correo_paciente (
    IN p_correo VARCHAR(100)
)
BEGIN
    DECLARE correo_existente INT;

    -- Verificar si el correo ya existe en la tabla sesion paciente
    SELECT COUNT(*) INTO correo_existente
    FROM paciente_sesion
    WHERE correo_electronico = p_correo;

    -- Comprobar resultado y devolver error si el correo ya existe
    IF correo_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El correo ya esta registrado en la tabla paciente_sesion.';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE verificar_unicidad_nutriologo (
    IN p_correo VARCHAR(100),
    IN p_cedula VARCHAR(20),
    IN p_telefono VARCHAR(15)
)
BEGIN
    DECLARE correo_existente INT;
    DECLARE cedula_existente INT;
    DECLARE telefono_existente INT;

    -- Verificar si el correo ya existe
    SELECT COUNT(*) INTO correo_existente
    FROM nutriologo_sesion
    WHERE correo_electronico = p_correo;

    -- Verificar si la c�dula ya existe
    SELECT COUNT(*) INTO cedula_existente
    FROM nutriologo
    WHERE cedula_profesional = p_cedula;

    -- Verificar si el tel�fono ya existe
    SELECT COUNT(*) INTO telefono_existente
    FROM nutriologo
    WHERE telefono = p_telefono;

    -- Comprobar resultados y devolver errores personalizados
    IF correo_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El correo ya est� registrado.';
    END IF;

    IF cedula_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La c�dula ya est� registrada.';
    END IF;

    IF telefono_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El tel�fono ya est� registrado.';
    END IF;
END$$

DELIMITER ;