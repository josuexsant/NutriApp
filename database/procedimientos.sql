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
    DECLARE last_id_sesion INT;

    -- Validar que el correo sea único
    IF EXISTS (SELECT 1 FROM paciente_sesion WHERE correo_electronico = p_correo_electronico) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo electrónico ya está registrado.';
    END IF;

   -- Validación de nombre
IF p_nombres NOT REGEXP '^[A-Za-zÁáÉéÍíÓóÚúÑñ ]+$' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre debe contener solo letras y no puede estar vacío.';
END IF;

-- Validación de primer apellido
IF p_apellido_pat NOT REGEXP '^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$' OR p_apellido_pat IS NULL OR p_apellido_pat = '' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El primer apellido es obligatorio y debe contener solo letras.';
END IF;

-- Validación de segundo apellido (si se proporciona)
IF p_apellido_mat IS NOT NULL AND p_apellido_mat != '' AND p_apellido_mat NOT REGEXP '^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$' THEN
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
    SET last_id_sesion = LAST_INSERT_ID();

    -- Insertar en la tabla token_paciente
    INSERT INTO tokens_paciente (id_sesion_paciente, token)
    VALUES (last_id_sesion, p_token);
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

    -- Verificar si la cedula ya existe
    SELECT COUNT(*) INTO cedula_existente
    FROM nutriologo
    WHERE cedula_profesional = p_cedula;

    -- Verificar si el telefono ya existe
    SELECT COUNT(*) INTO telefono_existente
    FROM nutriologo
    WHERE telefono = p_telefono;

    -- Comprobar resultados y devolver errores personalizados
    IF correo_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El correo ya esta registrado.';
    END IF;

    IF cedula_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cedula ya esta registrada.';
    END IF;

    IF telefono_existente > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El telefono ya esta registrado.';
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE agregar_regimen_tiempos(
    IN pacienteId INT,
    IN limiteCalorias DECIMAL(10, 2),
    IN tiemposComidaJson JSON,
    IN caloriasPorGrupoJson JSON,
    IN alimentosTiemposJson JSON
)
BEGIN
    DECLARE regimenId INT;
    DECLARE tiempoId INT;
    DECLARE grupoId INT;
    DECLARE indexTiempos INT DEFAULT 0;
    DECLARE indexCalorias INT DEFAULT 0;
    DECLARE indexAlimentos INT DEFAULT 0;

    DECLARE nombreTiempo VARCHAR(50);
    DECLARE grupo VARCHAR(50);
    DECLARE totalCalorias DECIMAL(10, 2);
    DECLARE alimentoPrincipal VARCHAR(100);
    DECLARE alternativa1 VARCHAR(100);
    DECLARE alternativa2 VARCHAR(100);

    -- Insertar en la tabla regimen_por_tiempos
    INSERT INTO regimen_por_tiempos (paciente_id, limite_calorias)
    VALUES (pacienteId, limiteCalorias);

    SET regimenId = LAST_INSERT_ID();

    -- Manejo de tiempos_comida
    WHILE JSON_UNQUOTE(JSON_EXTRACT(tiemposComidaJson, CONCAT('$[', indexTiempos, '].nombre_tiempo'))) IS NOT NULL DO
        SET nombreTiempo = JSON_UNQUOTE(JSON_EXTRACT(tiemposComidaJson, CONCAT('$[', indexTiempos, '].nombre_tiempo')));

        INSERT INTO tiempos_comida (regimen_id, nombre_tiempo)
        VALUES (regimenId, nombreTiempo);

        SET indexTiempos = indexTiempos + 1;
    END WHILE;

    -- Manejo de calorias_por_grupo
    WHILE JSON_UNQUOTE(JSON_EXTRACT(caloriasPorGrupoJson, CONCAT('$[', indexCalorias, '].grupo'))) IS NOT NULL DO
        SET grupo = JSON_UNQUOTE(JSON_EXTRACT(caloriasPorGrupoJson, CONCAT('$[', indexCalorias, '].grupo')));
        SET totalCalorias = JSON_UNQUOTE(JSON_EXTRACT(caloriasPorGrupoJson, CONCAT('$[', indexCalorias, '].total_calorias')));

        INSERT INTO calorias_por_grupo (regimen_id, grupo, total_calorias)
        VALUES (regimenId, grupo, totalCalorias);

        SET indexCalorias = indexCalorias + 1;
    END WHILE;

    -- Manejo de alimentos_tiempos
    WHILE JSON_UNQUOTE(JSON_EXTRACT(alimentosTiemposJson, CONCAT('$[', indexAlimentos, '].alimento_principal'))) IS NOT NULL DO
        SET alimentoPrincipal = JSON_UNQUOTE(JSON_EXTRACT(alimentosTiemposJson, CONCAT('$[', indexAlimentos, '].alimento_principal')));
        SET alternativa1 = JSON_UNQUOTE(JSON_EXTRACT(alimentosTiemposJson, CONCAT('$[', indexAlimentos, '].alternativa_1')));
        SET alternativa2 = JSON_UNQUOTE(JSON_EXTRACT(alimentosTiemposJson, CONCAT('$[', indexAlimentos, '].alternativa_2')));

        -- Obtener el tiempo_comida y calorias_por_grupo correspondientes
        SET tiempoId = (SELECT id FROM tiempos_comida WHERE regimen_id = regimenId ORDER BY id LIMIT indexAlimentos, 1);
        SET grupoId = (SELECT id FROM calorias_por_grupo WHERE regimen_id = regimenId ORDER BY id LIMIT indexAlimentos, 1);

        INSERT INTO alimentos_tiempos (tiempo_id, calorias_por_grupo_id, alimento_principal, alternativa_1, alternativa_2)
        VALUES (tiempoId, grupoId, alimentoPrincipal, alternativa1, alternativa2);

        SET indexAlimentos = indexAlimentos + 1;
    END WHILE;
END$$

DELIMITER ;

/*
Ejemplo de llamada agregar_regimen_tiempos

CALL agregar_regimen_tiempos(
    101,
    2000,
    '[{"nombre_tiempo": "Desayuno"}, {"nombre_tiempo": "Comida"}, {"nombre_tiempo": "Cena"}]', // JSON con los tiempos 
    '[{"grupo": "Cereales sin grasa", "total_calorias": 500}, {"grupo": "Frutas", "total_calorias": 300}, {"grupo": "Verduras", "total_calorias": 200}]', // JSON con los grupos y su total de calorias
    '[{"alimento_principal": "1 rebanada de pan", "alternativa_1": "3 galletas integrales", "alternativa_2": "1 tortilla de maíz"}, 
      {"alimento_principal": "1 taza de espinacas", "alternativa_1": "1 taza de acelgas", "alternativa_2": "1 taza de brócoli"}]' // JSON con los alimentos
);

*/

DELIMITER $$

CREATE PROCEDURE guardar_nutriologo(
    IN n_nombre VARCHAR(100),
    IN n_apellido_pat VARCHAR(100),
    IN n_apellido_mat VARCHAR(100),
    IN n_telefono VARCHAR(15),
    IN n_ciudad_residencia VARCHAR(50),
    IN n_codigo_postal VARCHAR(10),
    IN n_cedula_profesional VARCHAR(20),
    IN n_correo_electronico VARCHAR(100),
    IN n_contrasena VARCHAR(255),
    IN n_token VARCHAR(255)
)
BEGIN
    -- Declarar la variable para capturar el id del último nutriologo insertado
    DECLARE last_id INT;
    DECLARE last_id_sesion INT;

    -- Validar que la cédula profesional sea única
    IF EXISTS (SELECT 1 FROM nutriologo WHERE cedula_profesional = n_cedula_profesional) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cédula profesional ya está registrada.';
    END IF;

    -- Validar que el correo sea único
    IF EXISTS (SELECT 1 FROM nutriologo_sesion WHERE correo_electronico = n_correo_electronico) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo electrónico ya está registrado.';
    END IF;

-- Validación de nombre
IF n_nombre NOT REGEXP '^[A-Za-zÁáÉéÍíÓóÚúÑñ ]+$' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre debe contener solo letras y no puede estar vacío.';
END IF;

-- Validación de primer apellido
IF n_apellido_pat NOT REGEXP '^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$' OR n_apellido_pat IS NULL OR n_apellido_pat = '' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El primer apellido es obligatorio y debe contener solo letras.';
END IF;

-- Validación de segundo apellido (si se proporciona)
IF n_apellido_mat IS NOT NULL AND n_apellido_mat != '' AND n_apellido_mat NOT REGEXP '^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El segundo apellido debe contener solo letras si se proporciona.';
END IF;


    -- Validación del teléfono
    IF CHAR_LENGTH(n_telefono) < 10 OR CHAR_LENGTH(n_telefono) > 15 OR n_telefono NOT REGEXP '^[0-9]+$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El teléfono debe contener entre 10 y 15 dígitos numéricos.';
    END IF;

    -- Validación del código postal
    IF n_codigo_postal NOT REGEXP '^[0-9]{5}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El código postal debe contener exactamente 5 dígitos numéricos.';
    END IF;

    -- Validación de la cédula profesional
    IF CHAR_LENGTH(n_cedula_profesional) < 10 OR CHAR_LENGTH(n_cedula_profesional) > 20 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cédula profesional debe tener entre 10 y 20 caracteres.';
    END IF;

    -- Insertar en la tabla nutriologo
    INSERT INTO nutriologo (nombre, apellido_pat, apellido_mat, telefono, ciudad_residencia, codigo_postal, cedula_profesional)
    VALUES (n_nombre, n_apellido_pat, n_apellido_mat, n_telefono, n_ciudad_residencia, n_codigo_postal, n_cedula_profesional);

    -- Capturar el id del último registro insertado en nutriologo
    SET last_id = LAST_INSERT_ID();

    -- Insertar en la tabla nutriologo_sesion
    INSERT INTO nutriologo_sesion (id_nutriologo, correo_electronico, contrasena)
    VALUES (last_id, n_correo_electronico, n_contrasena);

    -- Capturar el id del último registro insertado en nutriologo_sesion
    SET last_id_sesion = LAST_INSERT_ID();

    -- Insertar en la tabla tokens_nutriologos
    INSERT INTO tokens_nutriologos (id_sesion_nutriologo, token)
    VALUES (last_id_sesion, n_token);

END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE autenticar_nutriologo(
    IN p_correo_electronico VARCHAR(100),
    IN p_contrasena VARCHAR(255),
    OUT p_token VARCHAR(255)
)
BEGIN
    DECLARE v_id_nutriologo INT;
    DECLARE v_contrasena_guardada VARCHAR(255);
    DECLARE v_token VARCHAR(255);

    -- Buscar el nutriologo con el correo electrónico proporcionado
    SELECT n.id_nutriologo, ns.contrasena, tn.token
    INTO v_id_nutriologo, v_contrasena_guardada, v_token
    FROM nutriologo_sesion ns
    JOIN nutriologo n ON n.id_nutriologo = ns.id_nutriologo
    JOIN tokens_nutriologos tn ON tn.id_sesion_nutriologo = ns.id_nutriologo_sesion
    WHERE ns.correo_electronico = p_correo_electronico;

    -- Verificar si el correo electrónico existe
    IF v_id_nutriologo IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo electrónico no está registrado.';
    END IF;

    -- Verificar si la contraseña coincide (suponiendo que la contraseña esté hasheada)
    IF v_contrasena_guardada != p_contrasena THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La contraseña es incorrecta.';
    END IF;

    -- Devolver el token del nutriologo
    SET p_token = v_token;

END$$

DELIMITER ;