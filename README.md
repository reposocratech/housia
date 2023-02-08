# HOUSIA

_ _ _

Este proyecto una aplicacion web realizada por un [equipo de desarrolladores](#contacto) para la empresa HousIA. 

 >"En HousIA nos encargamos de informate sobre el valor de tus propiedades y activos. Mediante el uso de la inteligencia artificial logramos disminuir el tiempo necesario para valorar tu inmueble permitiendote maximizar tus ganancias y mejorar el control sobre ellas."

Link video presentacion YT: (SocraTech HousIA)

## Tabla de contenidos

_ _ _ 


* [Informacion general](#información-general) 

* [Tecnologias utilizadas](#tecnologias-utilizadas).

* [Caracteristicas](#caracteristicas)

* [Capturas](#capturas)

* [Instalacion y configuracion](#instalacion-y-configuracion)

* [Agradecimientos](#agradecimientos)

* [Contacto](#contacto)

* [Licencia](#licencia)

## Información general

_ _ _

* El administrador puede crear inmuebles y ponerlos a la venta, puede eliminarlos de manera logica y podra editarlos, tambien podra editar el contenido del formulario de registro de propiedades, podra bloquear o desbloquear en caso de incidencia.

* El usuario puede registrarse, editar su perfil, crear y editar sus propiedades y ver un listado de las mismas (Portfolio) y ponerlas en venta; tambien puede ver un listado de todas la propiedades disponibles a la venta en la plataforma, pudiendo filtrar para mayor facilidad de busqueda  y agregarlas a su lista de favoritos. 

## Tecnologias utilizadas
_ _ _

*FRONT-END
![imagen: HTML](https://camo.githubusercontent.com/0c3a16a22ae058cfe38a06dc9ea16404cf006409262f547c9ccfa3ec8b30f71e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d48544d4c352d4533344632363f7374796c653d666c61742d737175617265266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)
![imagen:SASS](https://camo.githubusercontent.com/aa2d67d682b7d59cb0955695b192fc1390c9da34e90aa0c63079c411d01a9c66/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f534153532d686f7470696e6b2e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d53415353266c6f676f436f6c6f723d7768697465)
![imagen:Bootstrap](https://camo.githubusercontent.com/e56d586bf373ad33a4e8c7101246d54d5edc0fb52b87d309b899ce4818bd6086/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d426f6f7473747261702d3536334437433f7374796c653d666c61742d737175617265266c6f676f3d626f6f747374726170)
![imagen:Javascript](https://camo.githubusercontent.com/cf1a0ef083a2372d7f66b4691d5d25bfd8c098f42871e8da90edb1f32ed187c4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4a6176615363726970742d626c61636b3f7374796c653d666c61742d737175617265266c6f676f3d6a617661736372697074)


*BACK-END
![imagen:NODEJS](https://camo.githubusercontent.com/cec92673ea713fa89ba2ae2033daf5851f6f39393ff5b93231aa707d424638d9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4e6f64656a732d626c61636b3f7374796c653d666c61742d737175617265266c6f676f3d4e6f64652e6a73)
![imagen:Express](https://camo.githubusercontent.com/8286a45a106e1a3c07489f83a38159981d888518a740b59c807ffc1b7b1e2f7b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f657870726573732e6a732d2532333430346435392e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d253233363144414642)

*DATABASE
![imagen:MYSQL](https://camo.githubusercontent.com/1a085b81c0ac63ef70d22ee1a67560c1bdd5c42038ba20d129d89e7de5603953/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4d7953514c2d626c61636b3f7374796c653d666c61742d737175617265266c6f676f3d6d7973716c)

Otras librerias: Multer | Bcrypt | Nodemon | SweetAlert | ReactHookForm | jwtDecode |

## Caracteristicas

_ _ _

* Contraseñas encriptadas

* Diseño responsive

* Navegacion dinamica en toda la web

* Posibilidad de editar por completo los activos.

## Capturas

_ _ _
Vista Admin: 
![vista admin](https://github.com/reposocratech/housia/blob/master/screenshots/Admin.jpg)

Añadir Propiedad:
![añadir propiedad](https://github.com/reposocratech/housia/blob/master/screenshots/A%C3%B1adirPropiedad.jpg)

Vista Descubre:
![vista descubre](https://github.com/reposocratech/housia/blob/master/screenshots/Descubre.jpg)

Vista editar propiedad
![vista edicion de propiedad](https://github.com/reposocratech/housia/blob/master/screenshots/Editar.jpg)

Vista Portfolio
![vista del portafolio](https://github.com/reposocratech/housia/blob/master/screenshots/Portafolio.jpg)

Vista detalle de una propiedad
![vista del detalle de propiedad](https://github.com/reposocratech/housia/blob/master/screenshots/VistaUnaPropiedad.jpg)
_ _ _


## Instalacion y configuracion

_ _ _

Paso 1:

Crear la base de datos mediante el scrip Housia.sql, localizado en Housia/

Paso 2: 

Si se tiene instalado NODEJS pasar al paso 3 en caso contrario 

Instalar NODEJS para la creacion del servidor:
* Descargando el instalador desde el [ENLACE OFICIAL](https://nodejs.org/es/)
* O si se quiere instalar en el package manager:  $npm nodejs.install

Paso 3:

Crea el archivo .env (no disponible en este repositorio) en el directorio /server y completarlo de la siquiente forma:
![vista del .env](https://github.com/reposocratech/housia/blob/master/screenshots/.env-ejemplo.jpg)

Paso 4: 

Desde el directorio /server $npm i (o $npm install), esto instalara las dependencias necesarias en el servidor.

Paso 5:

Desde el directorio /client $npm i (o $npm install), esto instalara las dependecias necesarias en el cliente.

Paso 6: 

Desde el directorio /server lanzar el servidor mediante el comando $npm run dev

* Si aparece un error de conexion con el servidor sql, introduzca la siguiente linea en el gestor de base de datos (ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';)

Paso 7:

Desde el directorio /client ejecutar el cliente mediante el comando $npm start

Paso 8: 

En el navegador ir a la direccion localhost:3000.

Paso 9:

La aplicacion web se ejecutara entonces en el navegador.


**Ingreso del administrador:**

Los usuarios registrados dentro de la aplicacion tiene la categoria de usuario estandar. Para conceder permisos de administrador a cualquiera de ellos,
desde MySQL ingresar la sentencia **UPDATE user SET user_type = 1 WHERE user_id = (id del usuario elegido);**


## Agradecimientos:
_ _ _


* Agradecemos a los profersores Carlos Yáñez, Miriam Segura y Santiago Peña por su ayuda y dedicacion, por compartir sus conocimientos.

* Agradecimentos a la empresa HousIA por confiar en nosotros para realizar el proyecto.



## Contacto
_ _ _

Este proyecto ha sido realizado por un equipo de cinco desarrolladores compuesto por:

* [Juan Antonio Moreno Fernández](https://www.linkedin.com/in/juan-antonio-moreno-fernandez/)
* [Marcos Benítez Rodríguez](https://www.linkedin.com/in/marcos-benitez-rodriguez/)
* [Carolina Escobar Ríos](https://www.linkedin.com/in/carolina-escobar-r%C3%ADos/)
* [Jose Antonio Castañeda Ríos](https://www.linkedin.com/in/josea-casta%C3%B1eda-r%C3%ADos/)
* [Marianela Serodino Runco](https://www.linkedin.com/in/marianela-serodino-runco/)


## Licencia
_ _ _

* El codigo del proyecto aqui alojado se encuentra bajo [Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional.](https://creativecommons.org/licenses/by-nc-sa/4.0/)
* El nombre HousIA, los logos y toda la informacion y contenido relacionado con la empresa es propiedad de HousIA© y no podran utilizarse sin su consentimiento expreso.
