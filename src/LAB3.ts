// ============================================================
// Sistema de Reservas de Hotel
// ============================================================

// --- CLASSE RESERVA ---
// Representa uma reserva de quarto no hotel
class Reserva {
  public numeroQuarto: number;
  public nomeHospede: string;
  public dataEntrada: Date;
  public dataSaida: Date;

  // Construtor: inicializa todas as propriedades da reserva
  constructor(numeroQuarto: number, nomeHospede: string, dataEntrada: Date, dataSaida: Date) {
    this.numeroQuarto = numeroQuarto;
    this.nomeHospede = nomeHospede;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
  }
}

// --- CLASSE HOTEL ---
// Gerencia as reservas ativas do hotel
class Hotel {
  // Propriedade privada: só pode ser acessada dentro desta classe
  private reservas: Reserva[] = [];

  // Adiciona uma nova reserva ao hotel
  // Lança erro se o quarto já estiver reservado
  public registrarReserva(reserva: Reserva): void {
    const quartoOcupado: Reserva | undefined = this.reservas.find(
      r => r.numeroQuarto === reserva.numeroQuarto
    );

    if (quartoOcupado) {
      throw new Error(` Erro: Quarto ${reserva.numeroQuarto} já está reservado para "${quartoOcupado.nomeHospede}".`);
    }

    this.reservas.push(reserva);
    console.log(` Reserva registrada: Quarto ${reserva.numeroQuarto} para "${reserva.nomeHospede}".`);
  }

  // Remove a reserva do quarto especificado
  // Lança erro se não houver reserva para o quarto
  public cancelarReserva(numeroQuarto: number): void {
    const index: number = this.reservas.findIndex(r => r.numeroQuarto === numeroQuarto);

    if (index === -1) {
      throw new Error(` Erro: Nenhuma reserva encontrada para o quarto ${numeroQuarto}.`);
    }

    const reservaCancelada: Reserva = this.reservas[index]!;
    this.reservas.splice(index, 1);
    console.log(` Reserva cancelada: Quarto ${numeroQuarto} de "${reservaCancelada.nomeHospede}" foi liberado.`);
  }

  // Retorna "Reservado" ou "Disponível" para o quarto especificado
  public consultarStatusQuarto(numeroQuarto: number): string {
    const reserva: Reserva | undefined = this.reservas.find(
      r => r.numeroQuarto === numeroQuarto
    );

    if (reserva) {
      // Formata as datas para o padrão brasileiro
      const entrada: string = reserva.dataEntrada.toLocaleDateString("pt-BR");
      const saida: string = reserva.dataSaida.toLocaleDateString("pt-BR");
      return `Reservado — Hóspede: "${reserva.nomeHospede}" | Entrada: ${entrada} | Saída: ${saida}`;
    }

    return "Disponível";
  }
}

// ============================================================
// FUNÇÕES DE TESTE
// ============================================================

// Função para registrar reservas no hotel
function registrarReservas(hotel: Hotel): void {
  console.log("\n --- Registrando reservas ---");

  const reserva1: Reserva = new Reserva(
    101,
    "João Silva",
    new Date("2025-06-10"),
    new Date("2025-06-15")
  );

  const reserva2: Reserva = new Reserva(
    202,
    "Fernanda Oliveira",
    new Date("2025-06-12"),
    new Date("2025-06-18")
  );

  const reserva3: Reserva = new Reserva(
    303,
    "Roberto Santos",
    new Date("2025-06-20"),
    new Date("2025-06-25")
  );

  hotel.registrarReserva(reserva1);
  hotel.registrarReserva(reserva2);
  hotel.registrarReserva(reserva3);
}

// Função para cancelar a reserva de um quarto pelo número
function cancelarReserva(hotel: Hotel, numeroQuarto: number): void {
  console.log("\n --- Cancelando reserva ---");
  try {
    hotel.cancelarReserva(numeroQuarto);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(erro.message);
    }
  }
}

// Função para consultar e exibir o status de um quarto
function consultarStatusQuarto(hotel: Hotel, numeroQuarto: number): void {
  console.log("\n --- Consultando status do quarto ---");
  const status: string = hotel.consultarStatusQuarto(numeroQuarto);
  console.log(` Quarto ${numeroQuarto}: ${status}`);
}

// ============================================================
// EXECUÇÃO DOS TESTES
// ============================================================

const hotel = new Hotel();

// 1. Registra as reservas
registrarReservas(hotel);

// 2. Consulta o status dos quartos registrados
consultarStatusQuarto(hotel, 101);
consultarStatusQuarto(hotel, 202);

// 3. Cancela a reserva do quarto 101
cancelarReserva(hotel, 101);

// 4. Consulta o quarto 101 após o cancelamento (deve aparecer Disponível)
consultarStatusQuarto(hotel, 101);

// 5. Testa erro: tenta cancelar um quarto sem reserva
cancelarReserva(hotel, 101);

// 6. Testa erro: tenta reservar um quarto já ocupado
console.log("\n --- Registrando reservas ---");
try {
  const reservaDuplicada: Reserva = new Reserva(
    202,
    "Carlos Mendes",
    new Date("2025-06-13"),
    new Date("2025-06-16")
  );
  hotel.registrarReserva(reservaDuplicada);
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(erro.message);
  }
}
