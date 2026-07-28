create database AgoraGis_IN5CM;
use AgoraGis_IN5CM;

-- ========================================================
-- TABLAS
-- ========================================================

create table vendedor(
    id_vendedor int not null primary key auto_increment,
    dpi int not null,
    nombre varchar(25) not null,
    apellido varchar(25) not null,
    telefono int not null,
    correo varchar(50) not null,
    direccion varchar(100) not null
);

create table mercado(
    id_mercado int not null primary key auto_increment,
    nombre_mercado varchar(50) not null,
    direccion varchar(100) not null,
    telefono_administracion int not null
);

create table giro_comercial(
    id_giro int not null primary key auto_increment,
    nombre_giro varchar(50) not null,
    descripcion varchar(150) not null,
    permiso boolean not null
);

create table sector(
    id_sector int not null primary key auto_increment,
    nombre_sector varchar(50) not null,
    descripcion varchar(150) not null,
    id_mercado int not null,
    constraint FK_id_mercado foreign key (id_mercado) references 
        mercado(id_mercado) on delete cascade
);

create table puesto(
    id_puesto int not null primary key auto_increment,
    numero_puesto int not null,
    estado enum('disponible', 'ocupado') not null,
    tarifa_mensual decimal(10,2) not null,
    id_sector int not null,
    constraint FK_id_sector foreign key (id_sector) references 
        sector(id_sector) on delete cascade
);

create table asignacion_puesto(
    id_asignacion int not null primary key auto_increment,
    fecha_inicio date not null,
    fecha_fin date not null,
    estado_contrato enum('activo', 'finalizado') not null,
    id_vendedor int not null,
    id_puesto int not null,
    id_giro int not null,
    constraint FK_id_vendedor foreign key (id_vendedor) references 
        vendedor(id_vendedor) on delete cascade,
    constraint FK_id_puesto foreign key (id_puesto) references 
        puesto(id_puesto) on delete cascade,
    constraint FK_id_giro foreign key (id_giro) references 
        giro_comercial(id_giro) on delete cascade
);

create table pago(
    id_pago int not null primary key auto_increment,
    monto_pagado decimal(10,2) not null,
    fecha_pago datetime not null,
    mes_correspondiente varchar(20) not null,
    numero_recibo_municipal varchar(25) not null,
    estado_pago enum('completado', 'pendiente') not null,
    id_asignacion int not null,
    constraint FK_id_asignacion_pago foreign key (id_asignacion) references 
        asignacion_puesto(id_asignacion) on delete cascade
);

create table usuario(
    id_usuario int not null primary key auto_increment,
    username varchar(30) not null,
    pasword varchar(30) not null,
    nombre varchar(25) not null,
    apellido varchar(25) not null,
    correo varchar(50) not null,
    rol enum('administrador', 'recaudador', 'inspector') not null
);

create table multa(
    id_multa int not null primary key auto_increment,
    motivo varchar(150) not null,
    monto decimal(10,2) not null,
    fecha_emision datetime not null,
    estado enum('pendiente', 'pagada') not null,
    id_asignacion int not null,
    id_usuario int not null,
    constraint FK_id_asignacion_multa foreign key (id_asignacion) references 
        asignacion_puesto(id_asignacion) on delete cascade,
    constraint FK_id_usuario_multa foreign key (id_usuario) references 
        usuario(id_usuario) on delete cascade
);

create table inspeccion(
    id_inspeccion int not null primary key auto_increment,
    fecha_inspeccion datetime not null,
    resultado enum('aprobado', 'observaciones', 'ilegal') not null,
    observaciones varchar(255) not null,
    id_puesto int not null,
    id_usuario int not null,
    constraint FK_id_puesto_inspeccion foreign key (id_puesto) references 
        puesto(id_puesto) on delete cascade,
    constraint FK_id_usuario_inspeccion foreign key (id_usuario) references 
        usuario(id_usuario) on delete cascade
);

-- ========================================================
-- MERCADO
-- ========================================================

delimiter $$
create procedure sp_mercado_listar()
begin
    select * from mercado;
end$$
delimiter ;

delimiter $$
create procedure sp_mercado_buscar(in p_id int)
begin 
    select * from mercado where id_mercado = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_mercado_crear(
    p_nombre_mercado varchar(50),
    p_direccion varchar(100),
    p_telefono_administracion int
)
begin
    insert into mercado(nombre_mercado, direccion, telefono_administracion)
    values (p_nombre_mercado, p_direccion, p_telefono_administracion);
end$$
delimiter ;

delimiter $$
create procedure sp_mercado_actualizar(
    p_id_mercado int,
    p_nombre_mercado varchar(50),
    p_direccion varchar(100),
    p_telefono_administracion int
)
begin
    update mercado 
    set nombre_mercado = p_nombre_mercado,
        direccion = p_direccion,
        telefono_administracion = p_telefono_administracion
    where id_mercado = p_id_mercado;
end$$
delimiter ;

delimiter $$
create procedure sp_mercado_eliminar(
    p_id_mercado int
)
begin
    delete from mercado where id_mercado = p_id_mercado;
end$$
delimiter ;

-- ========================================================
-- SECTOR
-- ========================================================

delimiter $$
create procedure sp_sector_listar()
begin
    select * from sector;
end$$
delimiter ;

delimiter $$
create procedure sp_sector_buscar(in p_id int)
begin 
    select * from sector where id_sector = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_sector_crear(
    p_nombre_sector varchar(50),
    p_descripcion varchar(150),
    p_id_mercado int
)
begin
    insert into sector(nombre_sector, descripcion, id_mercado)
    values (p_nombre_sector, p_descripcion, p_id_mercado);
end$$
delimiter ;

delimiter $$
create procedure sp_sector_actualizar(
    p_id_sector int,
    p_nombre_sector varchar(50),
    p_descripcion varchar(150),
    p_id_mercado int
)
begin
    update sector 
    set nombre_sector = p_nombre_sector,
        descripcion = p_descripcion,
        id_mercado = p_id_mercado
    where id_sector = p_id_sector;
end$$
delimiter ;

delimiter $$
create procedure sp_sector_eliminar(
    p_id_sector int
)
begin
    delete from sector where id_sector = p_id_sector;
end$$
delimiter ;

-- ========================================================
-- PUESTO
-- ========================================================

delimiter $$
create procedure sp_puesto_listar()
begin
    select * from puesto;
end$$
delimiter ;

delimiter $$
create procedure sp_puesto_buscar(in p_id int)
begin 
    select * from puesto where id_puesto = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_puesto_crear(
    p_numero_puesto int,
    p_estado enum('disponible', 'ocupado'),
    p_tarifa_mensual decimal(10,2),
    p_id_sector int
)
begin
    insert into puesto(numero_puesto, estado, tarifa_mensual, id_sector)
    values (p_numero_puesto, p_estado, p_tarifa_mensual, p_id_sector);
end$$
delimiter ;

delimiter $$
create procedure sp_puesto_actualizar(
    p_id_puesto int,
    p_numero_puesto int,
    p_estado enum('disponible', 'ocupado'),
    p_tarifa_mensual decimal(10,2),
    p_id_sector int
)
begin
    update puesto 
    set numero_puesto = p_numero_puesto,
        estado = p_estado,
        tarifa_mensual = p_tarifa_mensual,
        id_sector = p_id_sector
    where id_puesto = p_id_puesto;
end$$
delimiter ;

delimiter $$
create procedure sp_puesto_eliminar(
    p_id_puesto int
)
begin
    delete from puesto where id_puesto = p_id_puesto;
end$$
delimiter ;

-- ========================================================
-- GIRO COMERCIAL
-- ========================================================

delimiter $$
create procedure sp_giro_comercial_listar()
begin
    select * from giro_comercial;
end$$
delimiter ;

delimiter $$
create procedure sp_giro_comercial_buscar(in p_id int)
begin 
    select * from giro_comercial where id_giro = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_giro_comercial_crear(
    p_nombre_giro varchar(50),
    p_descripcion varchar(150),
    p_permiso boolean
)
begin
    insert into giro_comercial(nombre_giro, descripcion, permiso)
    values (p_nombre_giro, p_descripcion, p_permiso);
end$$
delimiter ;

delimiter $$
create procedure sp_giro_comercial_actualizar(
    p_id_giro int,
    p_nombre_giro varchar(50),
    p_descripcion varchar(150),
    p_permiso boolean
)
begin
    update giro_comercial 
    set nombre_giro = p_nombre_giro,
        descripcion = p_descripcion,
        permiso = p_permiso
    where id_giro = p_id_giro;
end$$
delimiter ;

delimiter $$
create procedure sp_giro_comercial_eliminar(
    p_id_giro int
)
begin
    delete from giro_comercial where id_giro = p_id_giro;
end$$
delimiter ;

-- ========================================================
-- VENDEDOR
-- ========================================================

delimiter $$
create procedure sp_vendedor_listar()
begin
    select * from vendedor;
end$$
delimiter ;

delimiter $$
create procedure sp_vendedor_buscar(in p_id int)
begin 
    select * from vendedor where id_vendedor = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_vendedor_crear(
    p_dpi int, -- INT
    p_nombre varchar(25),
    p_apellido varchar(25),
    p_telefono int,
    p_correo varchar(50),
    p_direccion varchar(100)
)
begin
    insert into vendedor(dpi, nombre, apellido, telefono, correo, direccion)
    values (p_dpi, p_nombre, p_apellido, p_telefono, p_correo, p_direccion);
end$$
delimiter ;

delimiter $$
create procedure sp_vendedor_actualizar(
    p_id_vendedor int,
    p_dpi int, -- INT
    p_nombre varchar(25),
    p_apellido varchar(25),
    p_telefono int,
    p_correo varchar(50),
    p_direccion varchar(100)
)
begin
    update vendedor 
    set dpi = p_dpi,
        nombre = p_nombre,
        apellido = p_apellido,
        telefono = p_telefono,
        correo = p_correo,
        direccion = p_direccion
    where id_vendedor = p_id_vendedor;
end$$
delimiter ;

delimiter $$
create procedure sp_vendedor_eliminar(
    p_id_vendedor int
)
begin
    delete from vendedor where id_vendedor = p_id_vendedor;
end$$
delimiter ;

-- ========================================================
-- ASIGNACION DE PUESTO
-- ========================================================

delimiter $$
create procedure sp_asignacion_puesto_listar()
begin
    select * from asignacion_puesto;
end$$
delimiter ;

delimiter $$
create procedure sp_asignacion_puesto_buscar(in p_id int)
begin 
    select * from asignacion_puesto where id_asignacion = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_asignacion_puesto_crear(
    p_fecha_inicio date,
    p_fecha_fin date,
    p_estado_contrato enum('activo', 'finalizado'),
    p_id_vendedor int,
    p_id_puesto int,
    p_id_giro int
)
begin
    insert into asignacion_puesto(fecha_inicio, fecha_fin, estado_contrato, id_vendedor, id_puesto, id_giro)
    values (p_fecha_inicio, p_fecha_fin, p_estado_contrato, p_id_vendedor, p_id_puesto, p_id_giro);
end$$
delimiter ;

delimiter $$
create procedure sp_asignacion_puesto_actualizar(
    p_id_asignacion int,
    p_fecha_inicio date,
    p_fecha_fin date,
    p_estado_contrato enum('activo', 'finalizado'),
    p_id_vendedor int,
    p_id_puesto int,
    p_id_giro int
)
begin
    update asignacion_puesto 
    set fecha_inicio = p_fecha_inicio,
        fecha_fin = p_fecha_fin,
        estado_contrato = p_estado_contrato,
        id_vendedor = p_id_vendedor,
        id_puesto = p_id_puesto,
        id_giro = p_id_giro
    where id_asignacion = p_id_asignacion;
end$$
delimiter ;

delimiter $$
create procedure sp_asignacion_puesto_eliminar(
    p_id_asignacion int
)
begin
    delete from asignacion_puesto where id_asignacion = p_id_asignacion;
end$$
delimiter ;

-- ========================================================
-- PAGO
-- ========================================================

delimiter $$
create procedure sp_pago_listar()
begin
    select * from pago;
end$$
delimiter ;

delimiter $$
create procedure sp_pago_buscar(in p_id int)
begin 
    select * from pago where id_pago = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_pago_crear(
    p_monto_pagado decimal(10,2),
    p_fecha_pago datetime,
    p_mes_correspondiente varchar(20),
    p_numero_recibo_municipal varchar(25),
    p_estado_pago enum('completado', 'pendiente'),
    p_id_asignacion int
)
begin
    insert into pago(monto_pagado, fecha_pago, mes_correspondiente, numero_recibo_municipal, estado_pago, id_asignacion)
    values (p_monto_pagado, p_fecha_pago, p_mes_correspondiente, p_numero_recibo_municipal, p_estado_pago, p_id_asignacion);
end$$
delimiter ;

delimiter $$
create procedure sp_pago_actualizar(
    p_id_pago int,
    p_monto_pagado decimal(10,2),
    p_fecha_pago datetime,
    p_mes_correspondiente varchar(20),
    p_numero_recibo_municipal varchar(25),
    p_estado_pago enum('completado', 'pendiente'),
    p_id_asignacion int
)
begin
    update pago 
    set monto_pagado = p_monto_pagado,
        fecha_pago = p_fecha_pago,
        mes_correspondiente = p_mes_correspondiente,
        numero_recibo_municipal = p_numero_recibo_municipal,
        estado_pago = p_estado_pago,
        id_asignacion = p_id_asignacion
    where id_pago = p_id_pago;
end$$
delimiter ;

delimiter $$
create procedure sp_pago_eliminar(
    p_id_pago int
)
begin
    delete from pago where id_pago = p_id_pago;
end$$
delimiter ;

-- ========================================================
-- USUARIO
-- ========================================================

delimiter $$
create procedure sp_usuario_listar()
begin
    select * from usuario;
end$$
delimiter ;

delimiter $$
create procedure sp_usuario_buscar(in p_id int)
begin 
    select * from usuario where id_usuario = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_usuario_crear(
    p_username varchar(30),
    p_pasword varchar(30),
    p_nombre varchar(25),
    p_apellido varchar(25),
    p_correo varchar(50),
    p_rol enum('administrador', 'recaudador', 'inspector')
)
begin
    insert into usuario(username, pasword, nombre, apellido, correo, rol)
    values (p_username, p_pasword, p_nombre, p_apellido, p_correo, p_rol);
end$$
delimiter ;

delimiter $$
create procedure sp_usuario_actualizar(
    p_id_usuario int,
    p_username varchar(30),
    p_pasword varchar(30),
    p_nombre varchar(25),
    p_apellido varchar(25),
    p_correo varchar(50),
    p_rol enum('administrador', 'recaudador', 'inspector')
)
begin
    update usuario 
    set username = p_username,
        pasword = p_pasword,
        nombre = p_nombre,
        apellido = p_apellido,
        correo = p_correo,
        rol = p_rol
    where id_usuario = p_id_usuario;
end$$
delimiter ;

delimiter $$
create procedure sp_usuario_eliminar(
    p_id_usuario int
)
begin
    delete from usuario where id_usuario = p_id_usuario;
end$$
delimiter ;

-- ========================================================
-- MULTA
-- ========================================================

delimiter $$
create procedure sp_multa_listar()
begin
    select * from multa;
end$$
delimiter ;

delimiter $$
create procedure sp_multa_buscar(in p_id int)
begin 
    select * from multa where id_multa = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_multa_crear(
    p_motivo varchar(150),
    p_monto decimal(10,2),
    p_fecha_emision datetime,
    p_estado enum('pendiente', 'pagada'),
    p_id_asignacion int,
    p_id_usuario int
)
begin
    insert into multa(motivo, monto, fecha_emision, estado, id_asignacion, id_usuario)
    values (p_motivo, p_monto, p_fecha_emision, p_estado, p_id_asignacion, p_id_usuario);
end$$
delimiter ;

delimiter $$
create procedure sp_multa_actualizar(
    p_id_multa int,
    p_motivo varchar(150),
    p_monto decimal(10,2),
    p_fecha_emision datetime,
    p_estado enum('pendiente', 'pagada'),
    p_id_asignacion int,
    p_id_usuario int
)
begin
    update multa 
    set motivo = p_motivo,
        monto = p_monto,
        fecha_emision = p_fecha_emision,
        estado = p_estado,
        id_asignacion = p_id_asignacion,
        id_usuario = p_id_usuario
    where id_multa = p_id_multa;
end$$
delimiter ;

delimiter $$
create procedure sp_multa_eliminar(
    p_id_multa int
)
begin
    delete from multa where id_multa = p_id_multa;
end$$
delimiter ;

-- ========================================================
-- INSPECCION
-- ========================================================

delimiter $$
create procedure sp_inspeccion_listar()
begin
    select * from inspeccion;
end$$
delimiter ;

delimiter $$
create procedure sp_inspeccion_buscar(in p_id int)
begin 
    select * from inspeccion where id_inspeccion = p_id;
end $$
delimiter ;

delimiter $$
create procedure sp_inspeccion_crear(
    p_fecha_inspeccion datetime,
    p_resultado enum('aprobado', 'observaciones', 'ilegal'),
    p_observaciones varchar(255),
    p_id_puesto int,
    p_id_usuario int
)
begin
    insert into inspeccion(fecha_inspeccion, resultado, observaciones, id_puesto, id_usuario)
    values (p_fecha_inspeccion, p_resultado, p_observaciones, p_id_puesto, p_id_usuario);
end$$
delimiter ;

delimiter $$
create procedure sp_inspeccion_actualizar(
    p_id_inspeccion int,
    p_fecha_inspeccion datetime,
    p_resultado enum('aprobado', 'observaciones', 'ilegal'),
    p_observaciones varchar(255),
    p_id_puesto int,
    p_id_usuario int
)
begin
    update inspeccion 
    set fecha_inspeccion = p_fecha_inspeccion,
        resultado = p_resultado,
        observaciones = p_observaciones,
        id_puesto = p_id_puesto,
        id_usuario = p_id_usuario
    where id_inspeccion = p_id_inspeccion;
end$$
delimiter ;

delimiter $$
create procedure sp_inspeccion_eliminar(
    p_id_inspeccion int
)
begin
    delete from inspeccion where id_inspeccion = p_id_inspeccion;
end$$
delimiter ;


CALL sp_mercado_crear('Mercado Central', '9a Calle y 8a Avenida Zona 1', 22321100);
CALL sp_mercado_crear('Mercado La Terminal', 'Calzada Atanasio Tzul Zona 4', 22514433);
CALL sp_mercado_crear('Mercado San José', '12 Calle y 4a Avenida Zona 13', 23348899);
CALL sp_mercado_crear('Mercado El Guarda', '19 Avenida y 2a Calle Zona 11', 24719900);
CALL sp_mercado_crear('Mercado Flores', 'Calle Principal Zona 1', 78612233);
CALL sp_mercado_crear('Mercado La Parroquia', 'Calle Martí y 12 Avenida Zona 6', 22883344);
CALL sp_mercado_crear('Mercado Sur', '4a Avenida y 10a Calle Zona 1', 22305566);
CALL sp_mercado_crear('Mercado Roosevelt', 'Calzada Roosevelt Zona 7', 24337788);
CALL sp_mercado_crear('Mercado Villa Nueva', 'Calle Real Zona 1 Villa Nueva', 66301122);
CALL sp_mercado_crear('Mercado Mixco', '1a Calle Zona 1 Mixco', 24843311);

CALL sp_sector_crear('Sector Frutas y Verduras', 'Venta de productos agrícolas frescos', 1);
CALL sp_sector_crear('Sector Carnicería', 'Venta de carnes rojas, pollo y embutidos', 1);
CALL sp_sector_crear('Sector Abarrotes', 'Granos básicos y productos de primera necesidad', 2);
CALL sp_sector_crear('Sector Comedores', 'Venta de comida preparada y refacciones', 3);
CALL sp_sector_crear('Sector Lácteos', 'Quesos, crema y derivados de la leche', 2);
CALL sp_sector_crear('Sector Ropa y Calzado', 'Prendas de vestir y calzado variado', 4);
CALL sp_sector_crear('Sector Mariscos', 'Pescado fresco y mariscos del día', 1);
CALL sp_sector_crear('Sector Flores y Plantas', 'Arreglos florales y plantas ornamentales', 5);
CALL sp_sector_crear('Sector Artesanías', 'Productos artesanales y recuerdos', 6);
CALL sp_sector_crear('Sector Plásticos y Artículos para el Hogar', 'Utensilios de cocina y productos de plástico', 7);

CALL sp_puesto_crear(101, 'disponible', 250.00, 1);
CALL sp_puesto_crear(102, 'ocupado', 250.00, 1);
CALL sp_puesto_crear(201, 'ocupado', 350.00, 2);
CALL sp_puesto_crear(301, 'disponible', 300.00, 3);
CALL sp_puesto_crear(401, 'ocupado', 400.00, 4);
CALL sp_puesto_crear(103, 'ocupado', 250.00, 1);
CALL sp_puesto_crear(501, 'disponible', 280.00, 5);
CALL sp_puesto_crear(601, 'ocupado', 320.00, 6);
CALL sp_puesto_crear(701, 'ocupado', 380.00, 7);
CALL sp_puesto_crear(801, 'disponible', 200.00, 8);

CALL sp_giro_comercial_crear('Venta de Frutas', 'Comercialización de frutas nacionales e importadas', TRUE);
CALL sp_giro_comercial_crear('Carnicería y Embutidos', 'Venta de cortes de carne de res y cerdo', TRUE);
CALL sp_giro_comercial_crear('Abarrotería', 'Venta de granos, enlatados y limpieza', TRUE);
CALL sp_giro_comercial_crear('Comedor Popular', 'Platos preparados para almuerzo y desayuno', TRUE);
CALL sp_giro_comercial_crear('Lácteos y Cremerías', 'Venta de quesos frescos, cremas y yogurt', TRUE);
CALL sp_giro_comercial_crear('Venta de Ropa', 'Ropa para dama, caballero y niños', TRUE);
CALL sp_giro_comercial_crear('Pescadería', 'Venta de pescado fresco y mariscos', TRUE);
CALL sp_giro_comercial_crear('Floristería', 'Venta de ramos, arreglos y plantas', TRUE);
CALL sp_giro_comercial_crear('Venta de Calzado', 'Zapatos, sandalias y botas', TRUE);
CALL sp_giro_comercial_crear('Artículos para el Hogar', 'Plásticos, cristalería y accesorios', TRUE);

CALL sp_vendedor_crear(123456789, 'Carlos', 'Mendoza', 55112233, 'carlos.mendoza@gmail.com', 'Zona 1, Ciudad');
CALL sp_vendedor_crear(987654321, 'María', 'López', 44223344, 'maria.lopez@hotmail.com', 'Zona 5, Ciudad');
CALL sp_vendedor_crear(456789123, 'Jorge', 'Gómez', 33445566, 'jorge.gomez@yahoo.com', 'Zona 12, Ciudad');
CALL sp_vendedor_crear(789123456, 'Ana', 'Rodríguez', 55667788, 'ana.rodriguez@gmail.com', 'Zona 7, Ciudad');
CALL sp_vendedor_crear(321654987, 'Pedro', 'Martínez', 41223344, 'pedro.martinez@hotmail.com', 'Zona 3, Ciudad');
CALL sp_vendedor_crear(654987321, 'Lucía', 'Hernández', 59887766, 'lucia.hernandez@gmail.com', 'Zona 11, Ciudad');
CALL sp_vendedor_crear(147258369, 'Sonia', 'Pérez', 31445566, 'sonia.perez@yahoo.com', 'Zona 18, Ciudad');
CALL sp_vendedor_crear(369258147, 'Manuel', 'Morales', 47889900, 'manuel.morales@hotmail.com', 'Zona 6, Ciudad');
CALL sp_vendedor_crear(258147369, 'Elena', 'Castillo', 52114477, 'elena.castillo@gmail.com', 'Zona 10, Ciudad');
CALL sp_vendedor_crear(951753852, 'Fernando', 'Vásquez', 36998877, 'fernando.vasquez@yahoo.com', 'Zona 2, Ciudad');

CALL sp_usuario_crear('admin01', 'hash_pass_123', 'Diego', 'Cartajena', 'diego.admin@gmail.com', 'administrador');
CALL sp_usuario_crear('recaudador1', 'hash_pass_456', 'Ana', 'Martínez', 'ana.recauda@gmail.com', 'recaudador');
CALL sp_usuario_crear('inspector1', 'hash_pass_789', 'Luis', 'Ramírez', 'luis.inspect@gmail.com', 'inspector');
CALL sp_usuario_crear('admin02', 'hash_pass_000', 'Marta', 'García', 'marta.admin@gmail.com', 'administrador');
CALL sp_usuario_crear('recaudador2', 'hash_pass_111', 'Roberto', 'Díaz', 'roberto.recauda@gmail.com', 'recaudador');
CALL sp_usuario_crear('inspector2', 'hash_pass_222', 'Sofia', 'Estrada', 'sofia.inspect@gmail.com', 'inspector');
CALL sp_usuario_crear('recaudador3', 'hash_pass_333', 'Gabriel', 'Navarro', 'gabriel.recauda@gmail.com', 'recaudador');
CALL sp_usuario_crear('inspector3', 'hash_pass_444', 'Claudia', 'Rios', 'claudia.inspect@gmail.com', 'inspector');
CALL sp_usuario_crear('recaudador4', 'hash_pass_555', 'Hugo', 'Pineda', 'hugo.recauda@gmail.com', 'recaudador');
CALL sp_usuario_crear('admin03', 'hash_pass_666', 'Laura', 'Mejía', 'laura.admin@gmail.com', 'administrador');

CALL sp_asignacion_puesto_crear('2026-01-01', '2026-12-31', 'activo', 1, 2, 1);
CALL sp_asignacion_puesto_crear('2026-02-01', '2026-12-31', 'activo', 2, 3, 2);
CALL sp_asignacion_puesto_crear('2026-03-15', '2026-11-30', 'activo', 3, 5, 4);
CALL sp_asignacion_puesto_crear('2026-01-10', '2026-12-31', 'activo', 4, 6, 3);
CALL sp_asignacion_puesto_crear('2026-04-01', '2026-10-31', 'activo', 5, 7, 5);
CALL sp_asignacion_puesto_crear('2026-05-01', '2026-12-31', 'activo', 6, 8, 6);
CALL sp_asignacion_puesto_crear('2026-01-01', '2026-06-30', 'finalizado', 7, 9, 7);
CALL sp_asignacion_puesto_crear('2026-02-15', '2026-12-31', 'activo', 8, 1, 8);
CALL sp_asignacion_puesto_crear('2026-03-01', '2026-12-31', 'activo', 9, 4, 9);
CALL sp_asignacion_puesto_crear('2026-06-01', '2026-12-31', 'activo', 10, 10, 10);

CALL sp_pago_crear(250.00, '2026-06-05 10:30:00', 'Junio', 'REC-900123', 'completado', 1);
CALL sp_pago_crear(350.00, '2026-06-10 11:15:00', 'Junio', 'REC-900124', 'completado', 2);
CALL sp_pago_crear(400.00, '2026-07-01 09:00:00', 'Julio', 'REC-900125', 'pendiente', 3);
CALL sp_pago_crear(300.00, '2026-06-02 14:20:00', 'Junio', 'REC-900126', 'completado', 4);
CALL sp_pago_crear(280.00, '2026-06-15 08:45:00', 'Junio', 'REC-900127', 'completado', 5);
CALL sp_pago_crear(320.00, '2026-07-05 12:10:00', 'Julio', 'REC-900128', 'pendiente', 6);
CALL sp_pago_crear(380.00, '2026-05-28 16:00:00', 'Mayo', 'REC-900129', 'completado', 7);
CALL sp_pago_crear(200.00, '2026-06-08 10:00:00', 'Junio', 'REC-900130', 'completado', 8);
CALL sp_pago_crear(300.00, '2026-07-02 11:30:00', 'Julio', 'REC-900131', 'completado', 9);
CALL sp_pago_crear(400.00, '2026-07-10 15:50:00', 'Julio', 'REC-900132', 'pendiente', 10);

CALL sp_multa_crear('Atraso en la cuota del mes de mayo', 100.00, '2026-06-01 08:00:00', 'pagada', 1, 2);
CALL sp_multa_crear('Uso indebido de pasillo fuera del área asignada', 150.00, '2026-07-15 10:30:00', 'pendiente', 2, 3);
CALL sp_multa_crear('Falta de limpieza en el puesto asignado', 75.00, '2026-06-20 09:15:00', 'pagada', 3, 6);
CALL sp_multa_crear('Incumplimiento de horario de cierre', 50.00, '2026-07-02 18:00:00', 'pendiente', 4, 3);
CALL sp_multa_crear('Venta de mercadería no autorizada en el giro', 200.00, '2026-05-10 11:00:00', 'pagada', 5, 8);
CALL sp_multa_crear('Obstrucción de paso peatonal', 100.00, '2026-06-25 14:00:00', 'pendiente', 6, 6);
CALL sp_multa_crear('Conexión eléctrica no autorizada', 300.00, '2026-07-08 16:30:00', 'pendiente', 7, 3);
CALL sp_multa_crear('Atraso en la cuota del mes de junio', 100.00, '2026-07-11 08:30:00', 'pendiente', 8, 2);
CALL sp_multa_crear('Falta de rótulo visible con número de puesto', 50.00, '2026-06-14 10:45:00', 'pagada', 9, 8);
CALL sp_multa_crear('No acatar observaciones sanitarias previas', 150.00, '2026-07-18 12:00:00', 'pendiente', 10, 6);

CALL sp_inspeccion_crear('2026-06-20 09:00:00', 'aprobado', 'Puesto limpio y cumple con las normas sanitarias', 2, 3);
CALL sp_inspeccion_crear('2026-07-10 10:30:00', 'observaciones', 'Requiere mejor manejo de desechos sólidos', 3, 3);
CALL sp_inspeccion_crear('2026-07-22 11:15:00', 'ilegal', 'Instalación eléctrica no autorizada conectada', 5, 3);
CALL sp_inspeccion_crear('2026-06-15 14:00:00', 'aprobado', 'Extintor vigente y área despejada', 6, 6);
CALL sp_inspeccion_crear('2026-07-01 08:45:00', 'observaciones', 'Mercadería sobrepasa el límite del puesto', 7, 8);
CALL sp_inspeccion_crear('2026-07-05 15:20:00', 'aprobado', 'Licencia y permisos visibles y en regla', 8, 6);
CALL sp_inspeccion_crear('2026-06-28 10:00:00', 'ilegal', 'Venta de productos congelados sin refrigeración adecuada', 9, 3);
CALL sp_inspeccion_crear('2026-07-12 11:50:00', 'aprobado', 'Sin novedades en la inspección de rutina', 1, 8);
CALL sp_inspeccion_crear('2026-07-19 13:10:00', 'observaciones', 'Falta de uso de indumentaria de higiene', 4, 6);
CALL sp_inspeccion_crear('2026-07-25 09:30:00', 'aprobado', 'Puesto en perfectas condiciones generales', 10, 3);


