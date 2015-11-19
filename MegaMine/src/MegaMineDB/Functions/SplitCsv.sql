if objectproperty(object_id('dbo.SplitCsv'), N'IsTableFunction') = 1
	drop function [dbo].[SplitCsv]
go

create function [dbo].[SplitCsv] (@csv VARCHAR(MAX))
returns @CsvTab table
   (id int not null)
as
begin
declare @split char(1),
        @xml xml

select @split = ','

select @xml = convert(xml,' <root> <s>' + replace(@csv, @split,'</s> <s>') + '</s>   </root> ')

insert into @CsvTab(id)
select T.c.value('.','varchar(20)')
from @xml.nodes('/root/s') T(c)
	return
end
go

