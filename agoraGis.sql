create database AgoraGis_IN5CM;
use AgoraGis_IN5CM;

create table vendedor(
	id_vendedor int not null primary key auto_increment,
    dpi varchar(13) not null,
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
    comentarios_observaciones varchar(255) not null,
    id_puesto int not null,
    id_usuario int not null,
    constraint FK_id_puesto_inspeccion foreign key (id_puesto) references 
		puesto(id_puesto) on delete cascade,
    constraint FK_id_usuario_inspeccion foreign key (id_usuario) references 
		usuario(id_usuario) on delete cascade
);

-- MERCADO

delimiter $$
create procedure sp_mercado_read()
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
create procedure sp_mercado_create(
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
create procedure sp_mercado_update(
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
create procedure sp_mercado_delete(
    p_id_mercado int
)
begin
    delete from mercado where id_mercado = p_id_mercado;
end$$
delimiter ;


-- SECTOR

delimiter $$
create procedure sp_sector_read()
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
create procedure sp_sector_create(
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
create procedure sp_sector_update(
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
create procedure sp_sector_delete(
    p_id_sector int
)
begin
    delete from sector where id_sector = p_id_sector;
end$$
delimiter ;


-- PUESTO

delimiter $$
create procedure sp_puesto_read()
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
create procedure sp_puesto_create(
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
create procedure sp_puesto_update(
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
create procedure sp_puesto_delete(
    p_id_puesto int
)
begin
    delete from puesto where id_puesto = p_id_puesto;
end$$
delimiter ;


-- GIRO COMERCIAL

delimiter $$
create procedure sp_giro_comercial_read()
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
create procedure sp_giro_comercial_create(
    p_nombre_giro varchar(50),
    p_descripcion varchar(150),
    p_requiere_permiso_especial boolean
)
begin
    insert into giro_comercial(nombre_giro, descripcion, requiere_permiso_especial)
    values (p_nombre_giro, p_descripcion, p_requiere_permiso_especial);
end$$
delimiter ;

delimiter $$
create procedure sp_giro_comercial_update(
    p_id_giro int,
    p_nombre_giro varchar(50),
    p_descripcion varchar(150),
    p_requiere_permiso_especial boolean
)
begin
    update giro_comercial 
    set nombre_giro = p_nombre_giro,
        descripcion = p_descripcion,
        requiere_permiso_especial = p_requiere_permiso_especial
    where id_giro = p_id_giro;
end$$
delimiter ;

delimiter $$
create procedure sp_giro_comercial_delete(
    p_id_giro int
)
begin
    delete from giro_comercial where id_giro = p_id_giro;
end$$
delimiter ;


-- VENDEDOR

delimiter $$
create procedure sp_vendedor_read()
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
create procedure sp_vendedor_create(
    p_dpi varchar(13),
    p_nombre_completo varchar(100),
    p_telefono int,
    p_correo_electronico varchar(50),
    p_direccion_residencia varchar(100)
)
begin
    insert into vendedor(dpi, nombre_completo, telefono, correo_electronico, direccion_residencia)
    values (p_dpi, p_nombre_completo, p_telefono, p_correo_electronico, p_direccion_residencia);
end$$
delimiter ;

delimiter $$
create procedure sp_vendedor_update(
    p_id_vendedor int,
    p_dpi varchar(13),
    p_nombre_completo varchar(100),
    p_telefono int,
    p_correo_electronico varchar(50),
    p_direccion_residencia varchar(100)
)
begin
    update vendedor 
    set dpi = p_dpi,
        nombre_completo = p_nombre_completo,
        telefono = p_telefono,
        correo_electronico = p_correo_electronico,
        direccion_residencia = p_direccion_residencia
    where id_vendedor = p_id_vendedor;
end$$
delimiter ;

delimiter $$
create procedure sp_vendedor_delete(
    p_id_vendedor int
)
begin
    delete from vendedor where id_vendedor = p_id_vendedor;
end$$
delimiter ;

-- ASIGNACION DE PUESTO

delimiter $$
create procedure sp_asignacion_puesto_read()
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
create procedure sp_asignacion_puesto_create(
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
create procedure sp_asignacion_puesto_update(
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
create procedure sp_asignacion_puesto_delete(
    p_id_asignacion int
)
begin
    delete from asignacion_puesto where id_asignacion = p_id_asignacion;
end$$
delimiter ;


-- PAGO
delimiter $$
create procedure sp_pago_read()
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
create procedure sp_pago_create(
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
create procedure sp_pago_update(
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
create procedure sp_pago_delete(
    p_id_pago int
)
begin
    delete from pago where id_pago = p_id_pago;
end$$
delimiter ;


-- USUARIO

delimiter $$
create procedure sp_usuario_read()
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
create procedure sp_usuario_create(
    p_username varchar(30),
    p_password_hash varchar(255),
    p_nombre_completo varchar(100),
    p_correo varchar(50),
    p_rol enum('administrador', 'recaudador', 'inspector')
)
begin
    insert into usuario(username, password_hash, nombre_completo, correo, rol)
    values (p_username, p_password_hash, p_nombre_completo, p_correo, p_rol);
end$$
delimiter ;

delimiter $$
create procedure sp_usuario_update(
    p_id_usuario int,
    p_username varchar(30),
    p_password_hash varchar(255),
    p_nombre_completo varchar(100),
    p_correo varchar(50),
    p_rol enum('administrador', 'recaudador', 'inspector')
)
begin
    update usuario 
    set username = p_username,
        password_hash = p_password_hash,
        nombre_completo = p_nombre_completo,
        correo = p_correo,
        rol = p_rol
    where id_usuario = p_id_usuario;
end$$
delimiter ;

delimiter $$
create procedure sp_usuario_delete(
    p_id_usuario int
)
begin
    delete from usuario where id_usuario = p_id_usuario;
end$$
delimiter ;


-- MULTA

delimiter $$
create procedure sp_multa_read()
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
create procedure sp_multa_create(
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
create procedure sp_multa_update(
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
create procedure sp_multa_delete(
    p_id_multa int
)
begin
    delete from multa where id_multa = p_id_multa;
end$$
delimiter ;


-- INSPECCION

delimiter $$
create procedure sp_inspeccion_read()
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
create procedure sp_inspeccion_create(
    p_fecha_inspeccion datetime,
    p_resultado enum('aprobado', 'observaciones', 'ilegal'),
    p_comentarios_observaciones varchar(255),
    p_id_puesto int,
    p_id_usuario int
)
begin
    insert into inspeccion(fecha_inspeccion, resultado, comentarios_observaciones, id_puesto, id_usuario)
    values (p_fecha_inspeccion, p_resultado, p_comentarios_observaciones, p_id_puesto, p_id_usuario);
end$$
delimiter ;

delimiter $$
create procedure sp_inspeccion_update(
    p_id_inspeccion int,
    p_fecha_inspeccion datetime,
    p_resultado enum('aprobado', 'observaciones', 'ilegal'),
    p_comentarios_observaciones varchar(255),
    p_id_puesto int,
    p_id_usuario int
)
begin
    update inspeccion 
    set fecha_inspeccion = p_fecha_inspeccion,
        resultado = p_resultado,
        comentarios_observaciones = p_comentarios_observaciones,
        id_puesto = p_id_puesto,
        id_usuario = p_id_usuario
    where id_inspeccion = p_id_inspeccion;
end$$
delimiter ;

delimiter $$
create procedure sp_inspeccion_delete(
    p_id_inspeccion int
)
begin
    delete from inspeccion where id_inspeccion = p_id_inspeccion;
end$$
delimiter ;