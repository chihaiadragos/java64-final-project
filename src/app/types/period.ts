class Period {
    public startDate: String;
    public endDate: String;

    
  constructor();

  constructor(
    startDate: string,
    endDate: string,
  );

    constructor(    
      startDate?: string,
      endDate?: string
    ) {
        this.startDate = startDate ?? '';
        this.endDate = endDate ?? '';
    }
}
export default Period;